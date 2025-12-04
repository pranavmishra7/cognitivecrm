import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PcDetailsModel } from '../models/common/common-sections-models';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-pc-details',
  templateUrl: './pc-details.component.html',
  styleUrls: ['./pc-details.component.css'],
  standalone: true,
  imports: [FormsModule],
})
export class PcDetailsComponent implements OnInit {
  @Input() data?: PcDetailsModel;
  @Output() dataChange = new EventEmitter<PcDetailsModel>();

  model: PcDetailsModel = {};

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