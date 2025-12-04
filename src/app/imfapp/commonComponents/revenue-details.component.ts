import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RevenueDetailsModel } from '../models/common/common-sections-models';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-revenue-details',
  templateUrl: './revenue-details.component.html',
  styleUrls: ['./revenue-details.component.css'],
  standalone: true,
  imports: [FormsModule],
})
export class RevenueDetailsComponent implements OnInit {
  @Input() data?: RevenueDetailsModel;
  @Output() dataChange = new EventEmitter<RevenueDetailsModel>();

  model: RevenueDetailsModel = {};

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