import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FinalDetailsModel } from '../models/common/common-sections-models';;
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-final-details',
  templateUrl: './final-details.component.html',
  styleUrls: ['./final-details.component.css'],
  standalone: true,
  imports: [FormsModule], 
})
export class FinalDetailsComponent implements OnInit {
  @Input() data?: FinalDetailsModel;
  @Output() dataChange = new EventEmitter<FinalDetailsModel>();

  model: FinalDetailsModel = {};

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