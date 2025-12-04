import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PlanAndPremiumDetailsModel } from '../models/common/common-sections-models';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-plan-and-premium-details',
  templateUrl: './plan-and-premium-details.component.html',
  styleUrls: ['./plan-and-premium-details.component.css'],
  standalone: true,
  imports: [FormsModule],
})
export class PlanAndPremiumDetailsComponent implements OnInit {
  @Input() data?: PlanAndPremiumDetailsModel;
  @Output() dataChange = new EventEmitter<PlanAndPremiumDetailsModel>();

  model: PlanAndPremiumDetailsModel = {};

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