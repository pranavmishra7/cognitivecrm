import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LifeAssuredDetails, LifeAssuredDetailsModel } from '../models/LifeAssuredDetailsModel';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-life-assured',
 standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './life-assured.component.html',
  styleUrl: './life-assured.component.css'
})
export class LifeAssuredComponent {
 @Input() data?: LifeAssuredDetailsModel;
  @Output() dataChange = new EventEmitter<LifeAssuredDetailsModel>();
  maxDob!: string;
  // Optional lists for autocomplete (bind from parent)
  @Input() districtOptions: string[] = [];
  @Input() stateOptions: string[] = [];
  @Input() countryOptions: string[] = [];

  model: LifeAssuredDetailsModel = new LifeAssuredDetails();

  ngOnInit(): void {
    if (this.data) {
      this.model = { ...this.data };
    }
    // Fix: compute max date in TS instead of template
  this.maxDob = new Date().toISOString().split('T')[0];
  }

  emitChange() {
    // emit a shallow copy to avoid external mutation
    this.dataChange.emit({ ...this.model });
  }

  onSubmit(form: any) {
    if (form.valid) {
      this.emitChange();
    } else {
      // touch all controls to surface validation messages
      Object.values((form.controls || {})).forEach((c: any) => c.markAsTouched && c.markAsTouched());
    }
  }
}
