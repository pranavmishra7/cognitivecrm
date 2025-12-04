import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PayoutDetailsModel } from '../models/common/common-sections-models';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-payout-details',
  templateUrl: './payout-details.component.html',
  styleUrls: ['./payout-details.component.css'],
  standalone: true,
  imports: [FormsModule],
})
export class PayoutDetailsComponent implements OnInit {
  @Input() data?: PayoutDetailsModel;
  @Output() dataChange = new EventEmitter<PayoutDetailsModel>();

  model: PayoutDetailsModel = {};

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