import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FiftypercentOfBcDetailsModel } from '../models/common/common-sections-models';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-fiftypercent-of-bc-details',
  templateUrl: './fiftypercent-of-bc-details.component.html',
  styleUrls: ['./fiftypercent-of-bc-details.component.css'],
  standalone: true,
  imports: [FormsModule], 
})
export class FiftypercentOfBcDetailsComponent implements OnInit {
  @Input() data?: FiftypercentOfBcDetailsModel;
  @Output() dataChange = new EventEmitter<FiftypercentOfBcDetailsModel>();

  model: FiftypercentOfBcDetailsModel = {};

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