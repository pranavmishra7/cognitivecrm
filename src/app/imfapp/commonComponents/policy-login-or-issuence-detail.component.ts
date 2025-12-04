import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PolicyLoginOrIssuenceDetailModel } from '../models/common/common-sections-models';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-policy-login-or-issuence-detail',
  templateUrl: './policy-login-or-issuence-detail.component.html',
  styleUrls: ['./policy-login-or-issuence-detail.component.css'],
  standalone: true,
  imports: [FormsModule],
})
export class PolicyLoginOrIssuenceDetailComponent implements OnInit {
  @Input() data?: PolicyLoginOrIssuenceDetailModel;
  @Output() dataChange = new EventEmitter<PolicyLoginOrIssuenceDetailModel>();

  model: PolicyLoginOrIssuenceDetailModel = {};

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