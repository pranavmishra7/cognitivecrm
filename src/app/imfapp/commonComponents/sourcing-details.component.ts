import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SourcingDetailsModel } from '../models/common/common-sections-models';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-sourcing-details',
  templateUrl: './sourcing-details.component.html',
  styleUrls: ['./sourcing-details.component.css'],
  standalone: true,
  imports: [FormsModule],
})
export class SourcingDetailsComponent implements OnInit {
  @Input() data?: SourcingDetailsModel;
  @Output() dataChange = new EventEmitter<SourcingDetailsModel>();

  model: SourcingDetailsModel = {};

  ngOnInit(): void {
    if (this.data) {
      this.model = { ...this.data };
    }
  }

  emitChange() {
    const out = { ...this.model } as any;
    if ((out as any).UlipNonulipTerm && !(out as any).PlanType) {
      out.PlanType = out.UlipNonulipTerm;
      delete out.UlipNonulipTerm;
    }
    this.dataChange.emit(out);
  }

  onSubmit(form: any) {
    if (form.valid) {
      this.emitChange();
    }
  }
}