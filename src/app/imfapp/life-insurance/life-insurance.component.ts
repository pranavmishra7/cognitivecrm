import { Component } from '@angular/core';
import { SourcingDetailsComponent } from "../commonComponents/sourcing-details.component";
import { ProposerDetailsComponent } from "../proposer-details/proposer-details.component";
import { LifeAssuredComponent } from "../life-assured/life-assured.component";
import { NomineeComponent } from "../nominee/nominee.component";
import { AppointeeComponent } from "../appointee/appointee.component";
import { PolicyLoginOrIssuenceDetailComponent } from "../commonComponents/policy-login-or-issuence-detail.component";
import { PlanAndPremiumDetailsComponent } from "../commonComponents/plan-and-premium-details.component";
import { RevenueDetailsComponent } from "../commonComponents/revenue-details.component";
import { BaseDetailsComponent } from "../commonComponents/base-details.component";
import { PcDetailsComponent } from "../commonComponents/pc-details.component";
import { FiftypercentOfBcDetailsComponent } from "../commonComponents/fiftypercent-of-bc-details.component";
import { OtherAmountDetailsComponent } from "../commonComponents/other-amount-details.component";
import { FinalDetailsComponent } from "../commonComponents/final-details.component";
import { GstDetailsComponent } from "../commonComponents/gst-details.component";
import { PayoutDetailsComponent } from "../commonComponents/payout-details.component";

@Component({
  selector: 'app-life-insurance',
  standalone: true,
  imports: [SourcingDetailsComponent, ProposerDetailsComponent, LifeAssuredComponent, NomineeComponent, AppointeeComponent, PolicyLoginOrIssuenceDetailComponent, PlanAndPremiumDetailsComponent, RevenueDetailsComponent, BaseDetailsComponent, PcDetailsComponent, FiftypercentOfBcDetailsComponent, OtherAmountDetailsComponent, FinalDetailsComponent, GstDetailsComponent, PayoutDetailsComponent],
  templateUrl: './life-insurance.component.html',
  styleUrl: './life-insurance.component.css'
})
export class LifeInsuranceComponent {

}
