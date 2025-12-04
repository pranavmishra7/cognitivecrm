import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OtherAmountDetailsModel } from '../models/common/common-sections-models';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-other-amount-details',
  templateUrl: './other-amount-details.component.html',
  styleUrls: ['./other-amount-details.component.css'],
  standalone: true,
  imports: [FormsModule],
})
export class OtherAmountDetailsComponent implements OnInit {
  @Input() data?: OtherAmountDetailsModel;
  @Output() dataChange = new EventEmitter<OtherAmountDetailsModel>();

  model: OtherAmountDetailsModel = {};

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