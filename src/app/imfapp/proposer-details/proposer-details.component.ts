import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProposerDetails, ProposerDetailsModel } from '../models/ProposerDetailsModel';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-proposer-details',
  templateUrl: './proposer-details.component.html',
  styleUrls: ['./proposer-details.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class ProposerDetailsComponent implements OnInit {
  @Input() data?: ProposerDetailsModel;
  @Output() dataChange = new EventEmitter<ProposerDetailsModel>();
  maxDob!: string;
  // Optional lists for autocomplete (bind from parent)
  @Input() districtOptions: string[] = [];
  @Input() stateOptions: string[] = [];
  @Input() countryOptions: string[] = [];

  model: ProposerDetailsModel = new ProposerDetails();

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
