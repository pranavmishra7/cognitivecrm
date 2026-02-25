import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { FormDataValue } from '../../models/FormDataValue'; 

@Injectable({ providedIn: 'root' })
export class TemplateImportService {
  constructor(private http: HttpClient) {}

  // Parse XLSX file and return structured rows + mapping meta
  async parseXlsxFile(file: File): Promise<{
    headers: string[];          // visible labels (row 1)
    internalKeys: string[];     // hidden internal fieldNames (row 2) - may be identical to headers if missing
    dataRows: string[][];       // rows of values (each is array aligned to headers)
    warnings: string[];
  }> {
    const data = await file.arrayBuffer();
    const wb = XLSX.read(data, { type: 'array' });

    const firstSheetName = wb.SheetNames[0];
    const ws = wb.Sheets[firstSheetName];

    // get raw rows as arrays (header:1)
    const rows: any[][] = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });

    const warnings: string[] = [];

    if (!rows || rows.length === 0) {
      warnings.push('The uploaded workbook is empty.');
      return { headers: [], internalKeys: [], dataRows: [], warnings };
    }

    // Normalize rows length to consistent cols
    const maxCols = rows.reduce((m, r) => Math.max(m, (r || []).length), 0);
    const padded = rows.map(r => {
      const row = Array.isArray(r) ? r.slice(0) : [];
      while (row.length < maxCols) row.push('');
      return row.map(cell => (cell === null || cell === undefined) ? '' : String(cell).trim());
    });

    // Row 0 => labels (visible)
    const labels = padded[0] || [];

    // Row 1 => internal keys (may be hidden in Excel). If not present (sheet has only one row),
    // try to guess by normalizing label strings -> internal keys.
    let internal = padded.length > 1 ? padded[1] : [];
    if (!internal || internal.every(c => c === '')) {
      // fallback: use normalized labels -> but importer will try match with field labels/fieldNames
      internal = labels.map((l: string) => this.normalizeForKey(l));
      warnings.push('Second row (internal field keys) missing; attempting to map using normalized labels.');
    }

    // Data rows start from row index 2 (third row) onwards
    const dataRows = padded.slice(2);

    // Trim trailing completely-empty columns from headers/internal/data
    // Determine last non-empty column index
    let lastCol = -1;
    for (let c = 0; c < maxCols; c++) {
      const anyNonEmpty = padded.some(r => (r[c] && r[c].toString().trim() !== ''));
      if (anyNonEmpty) lastCol = c;
    }
    const sliceTo = lastCol + 1;
    const headers = labels.slice(0, sliceTo).map(h => String(h || ''));
    const internalKeys = internal.slice(0, sliceTo).map(k => String(k || ''));

    const trimmedDataRows = dataRows.map(r => r.slice(0, sliceTo).map(v => String(v || '')));

    return { headers, internalKeys, dataRows: trimmedDataRows, warnings };
  }

  // Map parsed data to FormDataValue[] using formConfig to resolve field ids & section ids
  mapParsedToFormDataValues(
    parsed: { headers: string[]; internalKeys: string[]; dataRows: string[][]; warnings: string[] },
    formConfig: any,
    clientId?: string | null,
    perRowTransactionId = true // use unique transactionId per CSV row
  ): { values: FormDataValue[]; warnings: string[] } {
    const warnings = [...parsed.warnings];
    if (!formConfig) {
      warnings.push('formConfig not provided; cannot map internal keys to field metadata.');
      return { values: [], warnings };
    }

    // Build lookup: fieldName -> field object, normalizedLabel -> field object
    const fieldLookupByName = new Map<string, any>();
    const fieldLookupByNormalizedLabel = new Map<string, any>();

    for (const sec of (formConfig.sections || [])) {
      for (const f of (sec.fields || [])) {
        if (f.fieldName) fieldLookupByName.set(f.fieldName, { field: f, section: sec });
        const nlabel = this.normalizeForKey(f.label || '');
        if (nlabel) fieldLookupByNormalizedLabel.set(nlabel, { field: f, section: sec });
      }
    }

    // For each column, find matching field (prefer internalKeys -> exact fieldName)
    const columnMappings: Array<{ idx: number; header: string; internalKey: string; match?: { field:any, section:any } }> = [];
    parsed.internalKeys.forEach((key, idx) => {
      let match = null;
      if (key && fieldLookupByName.has(key)) {
        match = fieldLookupByName.get(key);
      } else {
        // try normalized header match
        const n = this.normalizeForKey(key || parsed.headers[idx] || '');
        if (n && fieldLookupByNormalizedLabel.has(n)) match = fieldLookupByNormalizedLabel.get(n);
      }

      if (!match) {
        warnings.push(`Column "${parsed.headers[idx] || key || 'col' + idx}" not mapped to any field.`);
      }
      columnMappings.push({ idx, header: parsed.headers[idx] || '', internalKey: key || '', match });
    });

    const values: FormDataValue[] = [];

    for (const row of parsed.dataRows) {
      // skip fully empty rows
      const rowHasValue = row.some(v => v !== null && v !== undefined && String(v).trim() !== '');
      if (!rowHasValue) continue;

      const txn = perRowTransactionId ? this.genUuid() : null;

      for (const col of columnMappings) {
        if (!col.match) continue; // unmatched column

        const raw = row[col.idx];
        const dataValue = raw == null ? '' : String(raw);

        const fdv: FormDataValue = {
          id: this.genUuid(),
          transactionId: txn,
          clientId: clientId ?? (formConfig.clientId ?? null),
          formId: formConfig.id ?? null,
          sectionId: col.match.section?.id ?? null,
          fieldId: col.match.field?.id ?? null,
          dataValue,
          active: true,
          isDraft: false,
          createdAt: new Date().toISOString(),
          updatedAt: null,
          createdBy: null,
          updatedBy: null
        };

        values.push(fdv);
      }
    }

    return { values, warnings };
  }

  // Post FormDataValue[] in batches to server endpoint
  async postValuesInBatches(
    values: FormDataValue[],
    batchSize = 100,
    url =  'http://localhost:7003/api/formDataValues/import'
  ): Promise<{ posted: number; errors: any[] }> {
    const errs: any[] = [];
    let posted = 0;
    for (let i = 0; i < values.length; i += batchSize) {
      const chunk = values.slice(i, i + batchSize);
      try {
        // expect server returns success; using firstValueFrom to await observable
        await firstValueFrom(this.http.post(url, chunk));
        console.log(`Posting chunk of ${chunk} values to ${url}...`);
        posted += chunk.length;
      } catch (ex) {
        errs.push({ index: i, error: ex, chunkLength: chunk.length });
        // decide: continue or break. We'll continue and collect errors.
      }
    }
    return { posted, errors: errs };
  }

  private normalizeForKey(s: string) {
    return (s || '').toString().trim().toLowerCase().replace(/[\s\-_]+/g, '');
  }

  private genUuid() {
    if (typeof (globalThis as any).crypto?.randomUUID === 'function') return (globalThis as any).crypto.randomUUID();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
