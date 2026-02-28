import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
@Component({
  selector: 'app-item-master-maintenance',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, AgGridModule],
  templateUrl: './item-master-maintenance.component.html',
  styleUrl: './item-master-maintenance.component.css'
})
export class ItemMasterMaintenanceComponent {

  activeTab: 'list' | 'create' = 'list';

  form!: FormGroup;
  items: any[] = [];

  rowData: any[] = [];
  columnDefs: any[] = [
    { field: 'itemCode', headerName: 'Item Code' },
    { field: 'description', headerName: 'Description' },
    { field: 'type', headerName: 'Type' },
    { field: 'baseMaterial', headerName: 'Base' }
  ];

  isLoading = false;
  listFilter = '';
  pageSize = 10;
  pageNumber = 1;
  totalPages = 1;
  totalCount = 0;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.initializeForm();
    this.loadJson();
     this.form.reset();
  }

  /* ---------------- FORM ---------------- */

  initializeForm() {
    this.form = this.fb.group({
      itemCode: [''],
      description: [''],
      type: [''],
      baseMaterial: [''],
      subCategory: [''],
      broadPurchaseCategory: [''],
      length: [''],
      width: [''],
      thickness: [''],
      finish: [''],
      colour: [''],
      drawingNumber: [''],
      revisionLevel: [''],
      processNumber: [''],
      developmentNumber: [''],
      stockUOM: [''],
      purchaseUOM: [''],
      bomUOM: [''],
      packingMode: [''],
      storageType: [''],
      weightKg: [''],
      packingLot: [''],
      lotSize: [''],
      createdBy: [''],
      createdDate: [''],
      itemSites: this.fb.array([])
    });
  }

  get itemSites(): FormArray {
    return this.form.get('itemSites') as FormArray;
  }

  addSite(site?: any) {
    this.itemSites.push(this.fb.group({
      siteCode: [site?.siteCode || ''],
      workCenter: [site?.workCenter || ''],
      isActive: [site?.isActive || false],
      isDefaultStore: [site?.isDefaultStore || false]
    }));
  }

  /* ---------------- JSON ---------------- */

  loadJson() {

  // 1️⃣ Check localStorage first
  const stored = localStorage.getItem('itemMasterData');

  if (stored) {
    this.items = JSON.parse(stored);
    this.rowData = [...this.items];
    return;
  }

  // 2️⃣ If not in localStorage, load from assets once
  this.http.get<any[]>('assets/item-master.json')
    .subscribe(data => {

      this.items = data || [];
      this.rowData = [...this.items];

      // Save initial data into localStorage
      localStorage.setItem('itemMasterData', JSON.stringify(this.items));
    });
}
  save() {

  const formValue = this.form.value;

  if (!formValue.itemCode) {
    alert('Item Code is required');
    return;
  }

  // Find existing record
  const existingIndex = this.items.findIndex(
    item => item.itemCode === formValue.itemCode
  );

  if (existingIndex > -1) {
    // UPDATE
    this.items[existingIndex] = formValue;
    console.log('Updated Item:', formValue);
  } else {
    // ADD
    this.items.push(formValue);
    console.log('Added Item:', formValue);
  }

  // Persist to localStorage
  localStorage.setItem('itemMasterData', JSON.stringify(this.items));

  // Refresh grid
  this.rowData = [...this.items];

  // Reset form safely
  this.resetForm();

  // Switch to list tab
  this.activeTab = 'list';
}
resetForm() {

  this.form.reset();

  // Clear FormArray safely
  while (this.itemSites.length) {
    this.itemSites.removeAt(0);
  }
}

onRowClicked(event: any) {

  const selectedItem = event.data;
  if (!selectedItem) return;

  this.activeTab = 'create';

  // Clear old FormArray
  while (this.itemSites.length) {
    this.itemSites.removeAt(0);
  }

  // Patch form
  this.form.patchValue(selectedItem);

  // Re-add sites
  selectedItem.itemSites?.forEach((site: any) => {
    this.addSite(site);
  });
}


  /* ---------------- CSV TEMPLATE ---------------- */

  downloadTemplate() {
    const headers = Object.keys(this.form.value).filter(k => k !== 'itemSites');
    const csvContent = headers.join(',') + '\n';

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'ItemMaster_Template.csv';
    link.click();
  }

  onCsvImport(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const rows = e.target.result.split('\n');
      const headers = rows[0].split(',');
      const values = rows[1]?.split(',');

      if (!values) return;

      headers.forEach((h: string, i: number) => {
        this.form.get(h.trim())?.setValue(values[i]?.trim());
      });
    };
    reader.readAsText(file);
  }

  /* ---------------- LIST TAB ---------------- */

  selectTab(tab: 'list' | 'create') {
    this.activeTab = tab;
  }

  reload() {
    this.loadJson();
  }

  applyFilter() {
    if (!this.listFilter) {
      this.rowData = this.items;
      return;
    }
    this.rowData = this.items.filter(i =>
      Object.values(i).join(' ').toLowerCase().includes(this.listFilter.toLowerCase())
    );
  }

  prevPage() {}
  nextPage() {}
  
}