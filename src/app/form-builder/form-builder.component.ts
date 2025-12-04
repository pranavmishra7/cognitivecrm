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

  constructor(private api: FormApiService, private auth: AuthService) {}
  ngOnInit(): void {
    this.clientId = this.auth.getClientId() || "";
  }

  /** ------------------------
   * IMPORT EXCEL
   * ------------------------ */
onFileChange(ev: Event) {
  const input = ev.target as HTMLInputElement;
  if (!input.files?.length) return;

  const file = input.files[0];
  const reader = new FileReader();

  // local uploaded file path (from your session)
  const uploadedFileUrl = '/mnt/data/postalcodes.csv';

  // small helper to normalize strings into snake_case (lowercase, underscores)
  const normalize = (s: string) =>
    (s ?? '')
      .toString()
      .trim()
      .replace(/[^\w\s-]/g, '')   // remove special chars
      .replace(/\s+/g, '_')       // spaces -> underscore
      .replace(/_+/g, '_')        // collapse multiple underscores
      .toLowerCase();

  reader.onload = (e: ProgressEvent<FileReader>) => {
    const data = new Uint8Array((e.target as FileReader).result as ArrayBuffer);
    const wb = XLSX.read(data, { type: 'array' });

    // Use sheet 0 as form name (original value preserved)
    const formName = wb.SheetNames[0];
    const formSheet = wb.Sheets[formName];
    const formRows: any[] = XLSX.utils.sheet_to_json(formSheet, { defval: '' });

    const sections: SectionDto[] = [];
    this.preview = [];

    // normalized form name for building IDs/keys
    const formNameNorm = normalize(formName);

    formRows.forEach((row: any) => {
      const rawSectionName = (row['Section'] ?? '').toString().trim();
      if (!rawSectionName) return;

      const displayOrder = Number(row['Display Order'] ?? 0);

      // Section sheet (if present)
      const secSheet = wb.Sheets[rawSectionName];
      const secRows: any[] = secSheet ? XLSX.utils.sheet_to_json(secSheet, { defval: '' }) : [];

      // Create a single sectionId for this section and normalized section name
      const sectionId = uuidv4();
      const sectionNameNorm = normalize(rawSectionName);
      // final sectionName = formName_sectionName (normalized)
      const sectionName = `${formNameNorm}_${sectionNameNorm}`;

      const fields: FieldConfigDto[] = secRows.map((r: any, idx: number) => {
        const label = (r['Name'] ?? '').toString().trim();
        // base field name normalized
        const baseFieldName = normalize(label);
        // fieldName = formName_sectionName_fieldName
        const fieldName = `${formNameNorm}_${sectionNameNorm}_${baseFieldName}`;

        const type = (r['Type'] ?? '').toString() || 'text';
        const fieldOrder = Number(r['Display Order'] ?? idx + 1);

        return {
          id: uuidv4(),
          clientId: this.clientId,
          sectionId, // use the section's id so backend can link
          fieldName,
          fieldOrder,
          type,
          label,
          placeholder: (r['Placeholder'] ?? '').toString(),
          options: (r['Options'] ?? '').toString(),
          optionList: ((r['Options'] ?? '').toString()
            ? (r['Options'] ?? '').toString().split(',').map((opt: string) => opt.trim())
            : []),
          required: /required|true|1|yes/i.test((r['Validation'] ?? '').toString()),
          validationMessage: (r['Validation Message'] ?? '').toString(),
          defaultValue: (r['Default Value'] ?? '').toString()
        } as FieldConfigDto;
      });

      const section: SectionDto = {
        id: sectionId,
        clientId: this.clientId,
        formId: null, // backend will fill
        sectionName,  // normalized form_section name
        displayOrder,
        fields
      };

      sections.push(section);

      fields.forEach(f =>
        this.preview.push({
          sectionName,
          displayOrder,
          ...f
        })
      );
    });

    this.formData = {
      id: uuidv4(),
      clientId: this.clientId,
      formName,
      sections
    };
  };

  reader.readAsArrayBuffer(file);
}

  importToApi() {
    if (!this.formData) {
      alert('No form data found.');
      return;
    }

    const payload: ImportFieldsRequest = {
      clientId: this.clientId,
      formName: this.formData.formName,
      sections: this.formData.sections
    };
    console.log(payload);
    this.uploading = true;
    this.api.importForm(payload).subscribe({
      next: (res) => {
        this.uploading = false;
        if (res.success) {
          this.formData = res.data;
          alert('Form imported successfully');
        } else {
          alert('Import failed: ' + res.message);
        }
      },
      error: (err) => {
        this.uploading = false;
        alert('Import failed');
        console.error(err);
      }
    });
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
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

