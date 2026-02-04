import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { FormApiService } from '../services/config/form-api-service.service';
import { FormDto, SectionDto, FieldConfigDto, ImportFieldsRequest } from '../models/FieldConfig';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/config/auth.service';
import { formatLabel, toHtmlId } from '../utility/utility';
@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  standalone: true
})
export class FormBuilderComponent implements OnInit {
  formatLabel = formatLabel;
  toHtmlId = toHtmlId;
  formData: FormDto | null = null;
  uploading = false;
  clientId = "";
  // edit tracking
  editingForm = false;
  editingSectionId: string | null = null;
  editingFieldId: string | null = null;
  editTarget: any = null;
  preview: any = [];
  selectedFiles: File[] = [];
  parsedForms: FormDto[] = [];
  constructor(private api: FormApiService, private auth: AuthService) { }
  ngOnInit(): void {
    this.clientId = this.auth.getClientId() || "";
  }

  /** ------------------------
   * IMPORT EXCEL
   * ------------------------ */
  onFileChange(ev: Event) {
    const input = ev.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    this.selectedFiles = Array.from(input.files);
    this.parsedForms = []; // reset previous imports

    for (const file of this.selectedFiles) {
      this.parseExcelFile(file);
    }
  }

  private parseExcelFile(file: File) {
    const reader = new FileReader();

    const normalize = (s: string) =>
      (s ?? '')
        .toString()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '_')
        .replace(/_+/g, '_')
        .toLowerCase();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      const data = new Uint8Array((e.target as FileReader).result as ArrayBuffer);
      const wb = XLSX.read(data, { type: 'array' });

      const formName = wb.SheetNames[0];
      const formSheet = wb.Sheets[formName];
      const formRows: any[] = XLSX.utils.sheet_to_json(formSheet, { defval: '' });

      const sections: SectionDto[] = [];
      const formNameNorm = normalize(formName);

      formRows.forEach((row: any) => {
        const rawSectionName = (row['Section'] ?? '').toString().trim();
        if (!rawSectionName) return;

        const displayOrder = Number(row['Display Order'] ?? 0);
        const secSheet = wb.Sheets[rawSectionName];
        const secRows: any[] = secSheet ? XLSX.utils.sheet_to_json(secSheet, { defval: '' }) : [];

        const sectionId = uuidv4();
        const sectionNameNorm = normalize(rawSectionName);
        const sectionName = `${formNameNorm}_${sectionNameNorm}`;

        const fields: FieldConfigDto[] = secRows.map((r: any, idx: number) => {
          const label = (r['Name'] ?? '').toString().trim();
          const baseFieldName = normalize(label);
          const fieldName = `${formNameNorm}_${sectionNameNorm}_${baseFieldName}`;

          return {
            id: uuidv4(),
            clientId: this.clientId,
            sectionId,
            fieldName,
            fieldOrder: Number(r['Display Order'] ?? idx + 1),
            type: (r['Type'] ?? 'text').toString(),
            label,
            placeholder: (r['Placeholder'] ?? '').toString(),
            options: (r['Options'] ?? '').toString(),
            optionList: ((r['Options'] ?? '').toString()
              ? (r['Options'] ?? '').toString().split(',').map((o: string) => o.trim())
              : []),
            required: /required|true|1|yes/i.test((r['Validation'] ?? '').toString()),
            validationMessage: (r['Validation Message'] ?? '').toString(),
            defaultValue: (r['Default Value'] ?? '').toString()
          } as FieldConfigDto;
        });

        sections.push({
          id: sectionId,
          clientId: this.clientId,
          formId: null,
          sectionName,
          displayOrder,
          fields
        });
      });

      const parsedForm: FormDto = {
        id: uuidv4(),
        clientId: this.clientId,
        formName,
        sections
      };

      this.parsedForms.push(parsedForm);

      // Show last parsed form in UI (keeps existing UI behavior)
      this.formData = parsedForm;
    };

    reader.readAsArrayBuffer(file);
  }


  async importToApi() {
    if (!this.parsedForms.length) {
      alert('No forms to import.');
      return;
    }

    this.uploading = true;

    for (const form of this.parsedForms) {
      const payload: ImportFieldsRequest = {
        clientId: this.clientId,
        formName: form.formName,
        sections: form.sections
      };

      try {
        const res = await this.api.importForm(payload).toPromise();
        if (!res?.success) {
          console.error('Import failed for', form.formName, res?.message);
        }
        else {
          console.log('Import successful for', form.formName);
        }
      } catch (err) {
        console.error('Import error for', form.formName, err);
      }
    }

    this.uploading = false;
    alert('All files imported');
  }


  /** ------------------------
   * EDIT / DELETE
   * ------------------------ */
  startEditForm() {
    this.editingForm = true;
    this.editTarget = { ...this.formData };
  }
  saveEditForm() {
    if (this.formData) this.formData.formName = this.editTarget.formName;
    this.cancelEdit();
  }

  startEditSection(section: SectionDto) {
    this.editingSectionId = section.id;
    this.editTarget = { ...section };
  }
  saveEditSection() {
    if (!this.formData) return;
    const idx = this.formData.sections.findIndex(s => s.id === this.editTarget.id);
    if (idx > -1) this.formData.sections[idx] = { ...this.editTarget };
    this.cancelEdit();
  }

  startEditField(field: FieldConfigDto) {
    this.editingFieldId = field.id;
    this.editTarget = { ...field };
  }
  saveEditField(section: SectionDto) {
    const idx = section.fields.findIndex(f => f.id === this.editTarget.id);
    if (idx > -1) section.fields[idx] = { ...this.editTarget };
    this.cancelEdit();
  }

  cancelEdit() {
    this.editingForm = false;
    this.editingSectionId = null;
    this.editingFieldId = null;
    this.editTarget = null;
  }

  deleteForm() {
    this.formData = null;
  }
  deleteSection(section: SectionDto) {
    if (this.formData)
      this.formData.sections = this.formData.sections.filter(s => s.id !== section.id);
  }
  deleteField(section: SectionDto, field: FieldConfigDto) {
    section.fields = section.fields.filter(f => f.id !== field.id);
  }
}
// Simple UUID v4 generator
function uuidv4(): string {
  // Generates a random UUID (RFC4122 version 4 compliant)
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

