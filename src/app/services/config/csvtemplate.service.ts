import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Injectable({ providedIn: 'root' })
export class TemplateDownloadService {
  constructor() {}

  /**
   * Download an XLSX template where:
   * - Row 1: human labels (visible)
   * - Row 2: internal field names (hidden)
   * - Rows 3..N: blank template rows for data entry
   *
   * formConfig is expected to have formConfig.sections[].fields[] with { fieldName, label }
   */
  downloadTemplateWithHiddenFieldsXlsx(formConfig: any, filename?: string, blankRows = 5) {
    if (!formConfig) return;

    const labels: string[] = [];
    const fieldNames: string[] = [];

    for (const sec of formConfig.sections || []) {
      for (const f of sec.fields || []) {
        labels.push(f.label || f.fieldName);
        fieldNames.push(f.fieldName);
      }
    }

    // Build rows: first labels, then internal fieldnames, then a few blank rows
    const rows: any[][] = [];
    rows.push(labels);
    rows.push(fieldNames);
    for (let i = 0; i < blankRows; i++) rows.push(Array(labels.length).fill(''));

    // Convert to worksheet
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(rows);

    // Hide the second row (SheetJS uses 0-based indexing for !rows)
    // ws['!rows'] is an array of row properties; row 0 -> first row.
    ws['!rows'] = ws['!rows'] || [];
    // ensure at least two items present
    ws['!rows'][0] = ws['!rows'][0] || {};
    ws['!rows'][1] = ws['!rows'][1] || {};
    ws['!rows'][1].hidden = true; // hide second row

    // Optional: freeze top row so user sees headers even when scrolling
    ws['!freeze'] = { xSplit: 0, ySplit: 1 }; // freeze first row (labels); second row hidden

    // Create a workbook and append the sheet
    const wb: XLSX.WorkBook = {
      SheetNames: [formConfig.formName || 'Sheet1'],
      Sheets: {}
    };
    wb.Sheets[wb.SheetNames[0]] = ws;

    // Write workbook to binary
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    // Save file
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    saveAs(blob, filename || `${this.safeFileName(formConfig.formName || 'template')}-template.xlsx`);
  }

  private safeFileName(name: string) {
    return name.replace(/[<>:"/\\|?*\x00-\x1F]/g, '_').substring(0, 100);
  }
}
