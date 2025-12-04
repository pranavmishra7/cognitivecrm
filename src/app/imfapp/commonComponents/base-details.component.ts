import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BaseDetailsModel } from '../models/common/common-sections-models';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
@Component({
  selector: 'app-base-details',
  templateUrl: './base-details.component.html',
  styleUrls: ['./base-details.component.css'],
  standalone: true,
  imports: [FormsModule], 
})
export class BaseDetailsComponent implements OnInit {
  @Input() data?: BaseDetailsModel;
  @Output() dataChange = new EventEmitter<BaseDetailsModel>();

  model: BaseDetailsModel = {};

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