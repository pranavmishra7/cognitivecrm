import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TotalDetailsModel } from '../models/common/common-sections-models';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-total-details',
  templateUrl: './total-details.component.html',
  styleUrls: ['./total-details.component.css'],
  standalone: true,
  imports: [FormsModule],
})
export class TotalDetailsComponent implements OnInit {
  @Input() data?: TotalDetailsModel;
  @Output() dataChange = new EventEmitter<TotalDetailsModel>();

  model: TotalDetailsModel = {};

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