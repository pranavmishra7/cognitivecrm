import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GstDetailsModel } from '../models/common/common-sections-models';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-gst-details',
  templateUrl: './gst-details.component.html',
  styleUrls: ['./gst-details.component.css'],
  standalone: true,
  imports: [FormsModule],
})
export class GstDetailsComponent implements OnInit {
  @Input() data?: GstDetailsModel;
  @Output() dataChange = new EventEmitter<GstDetailsModel>();

  model: GstDetailsModel = {};

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