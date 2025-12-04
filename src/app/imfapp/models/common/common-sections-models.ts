// common-sections-models.ts
// Auto-generated TypeScript interfaces and classes for common insurance sections
// Field names derived from the 'Name' column and converted to PascalCase.

export interface SourcingDetailsModel {
  Fy?: string; // Original label: FY
  Year?: string; // Original label: Year
  LoginMonth?: string; // Original label: Login Month
  PremiumMonth?: number; // Original label: Premium Month
  Location?: string; // Original label: Location
  Department?: string; // Original label: Department
  InsuranceHead?: string; // Original label: Insurance Head
  BusinessHead?: string; // Original label: Business Head
  Presentator?: string; // Original label: Presentator
  BusinessPartner?: string; // Original label: Business Partner
  InsuranceCategory?: string; // Original label: Insurance Category
  PlanType?: string;
  NewRenewal?: string; // Original label: New/Renewal
  PrincipalCo?: string; // Original label: Principal Co.
  BusinessEmpCode?: string; // Original label: Business/Emp Code
  ApplicationNo?: string; // Original label: Application no
}

export class SourcingDetails implements SourcingDetailsModel {
  Fy?: string; // Original label: FY
  Year?: string; // Original label: Year
  LoginMonth?: string; // Original label: Login Month
  PremiumMonth?: number; // Original label: Premium Month
  Location?: string; // Original label: Location
  Department?: string; // Original label: Department
  InsuranceHead?: string; // Original label: Insurance Head
  BusinessHead?: string; // Original label: Business Head
  Presentator?: string; // Original label: Presentator
  BusinessPartner?: string; // Original label: Business Partner
  InsuranceCategory?: string; // Original label: Insurance Category
  NewRenewal?: string; // Original label: New/Renewal
  PrincipalCo?: string; // Original label: Principal Co.
  BusinessEmpCode?: string; // Original label: Business/Emp Code
  ApplicationNo?: string; // Original label: Application no
  UlipNonulipTerm?: string; // Original label: Ulip/NonUlip/Term

  constructor(init?: Partial<SourcingDetailsModel>) {
    Object.assign(this, init);
  }
}

export interface PolicyLoginOrIssuenceDetailModel {
  PrincipalCoLoginDt?: string; // Original label: Principal Co Login Dt
  PolicyNumber?: string; // Original label: Policy Number
  IssueDate?: string; // Original label: Issue Date
  PolicyStatus?: string; // Original label: Policy Status
  WorkFlowStatus?: string; // Original label: Work Flow Status
  PlvcStatus?: string; // Original label: PLVC Status
  PaidToDate?: number; // Original label: Paid To Date
}

export class PolicyLoginOrIssuenceDetail implements PolicyLoginOrIssuenceDetailModel {
  PrincipalCoLoginDt?: string; // Original label: Principal Co Login Dt
  PolicyNumber?: string; // Original label: Policy Number
  IssueDate?: string; // Original label: Issue Date
  PolicyStatus?: string; // Original label: Policy Status
  WorkFlowStatus?: string; // Original label: Work Flow Status
  PlvcStatus?: string; // Original label: PLVC Status
  PaidToDate?: number; // Original label: Paid To Date

  constructor(init?: Partial<PolicyLoginOrIssuenceDetailModel>) {
    Object.assign(this, init);
  }
}

export interface PlanAndPremiumDetailsModel {
  PlanName?: string; // Original label: Plan Name
  Pt?: string; // Original label: PT
  Ppt?: string; // Original label: PPT
  SumAssured?: number; // Original label: Sum Assured
  Mode?: string; // Original label: Mode
  ChequeAmount?: number; // Original label: Cheque Amount
  ModelPremium?: number; // Original label: Model Premium
  Wrp?: string; // Original label: WRP
  Wapi?: string; // Original label: WAPI
}

export class PlanAndPremiumDetails implements PlanAndPremiumDetailsModel {
  PlanName?: string; // Original label: Plan Name
  Pt?: string; // Original label: PT
  Ppt?: string; // Original label: PPT
  SumAssured?: number; // Original label: Sum Assured
  Mode?: string; // Original label: Mode
  ChequeAmount?: number; // Original label: Cheque Amount
  ModelPremium?: number; // Original label: Model Premium
  Wrp?: string; // Original label: WRP
  Wapi?: string; // Original label: WAPI

  constructor(init?: Partial<PlanAndPremiumDetailsModel>) {
    Object.assign(this, init);
  }
}

export interface RevenueDetailsModel {
  IssuedWrp?: string; // Original label: Issued WRP
  TotalRevenue?: number; // Original label: Total Revenue %
  Base?: string; // Original label: Base %
  Pc?: string; // Original label: PC %
  Bc50?: string; // Original label: BC* 50%
  Orc?: string; // Original label: ORC%
  Contest?: string; // Original label: Contest%
  Pli?: string; // Original label: PLI %
  TotalCommAmt?: number; // Original label: Total Comm Amt
  TotalCommissionReceived?: number; // Original label: Total Commission Received
}

export class RevenueDetails implements RevenueDetailsModel {
  IssuedWrp?: string; // Original label: Issued WRP
  TotalRevenue?: number; // Original label: Total Revenue %
  Base?: string; // Original label: Base %
  Pc?: string; // Original label: PC %
  Bc50?: string; // Original label: BC* 50%
  Orc?: string; // Original label: ORC%
  Contest?: string; // Original label: Contest%
  Pli?: string; // Original label: PLI %
  TotalCommAmt?: number; // Original label: Total Comm Amt
  TotalCommissionReceived?: number; // Original label: Total Commission Received

  constructor(init?: Partial<RevenueDetailsModel>) {
    Object.assign(this, init);
  }
}

export interface BaseDetailsModel {
  BaseCommAmt?: string; // Original label: Base Comm Amt
  TdsAmount?: number; // Original label: TDS Amount
  AmtClaimed?: string; // Original label: Amt Claimed
  AmtReceived?: string; // Original label: Amt Received
  BasePending?: string; // Original label: Base Pending
}

export class BaseDetails implements BaseDetailsModel {
  BaseCommAmt?: string; // Original label: Base Comm Amt
  TdsAmount?: number; // Original label: TDS Amount
  AmtClaimed?: string; // Original label: Amt Claimed
  AmtReceived?: string; // Original label: Amt Received
  BasePending?: string; // Original label: Base Pending

  constructor(init?: Partial<BaseDetailsModel>) {
    Object.assign(this, init);
  }
}

export interface PcDetailsModel {
  PcCommAmt?: string; // Original label: PC Comm Amt
  TdsAmount?: number; // Original label: TDS Amount
  AmtClaimed?: string; // Original label: Amt Claimed
  AmtReceived?: string; // Original label: Amt Received
  PcPending?: string; // Original label: PC Pending
}

export class PcDetails implements PcDetailsModel {
  PcCommAmt?: string; // Original label: PC Comm Amt
  TdsAmount?: number; // Original label: TDS Amount
  AmtClaimed?: string; // Original label: Amt Claimed
  AmtReceived?: string; // Original label: Amt Received
  PcPending?: string; // Original label: PC Pending

  constructor(init?: Partial<PcDetailsModel>) {
    Object.assign(this, init);
  }
}

export interface FiftypercentOfBcDetailsModel {
  BcPcAmt?: string; // Original label: 50% BC + PC Amt
  TdsAmount?: number; // Original label: TDS Amount
  AmountClaimed?: number; // Original label: Amount Claimed
  AmountReceived?: number; // Original label: Amount Received
  BcPcPending?: string; // Original label: 50% BC + PC Pending
}

export class FiftypercentOfBcDetails implements FiftypercentOfBcDetailsModel {
  BcPcAmt?: string; // Original label: 50% BC + PC Amt
  TdsAmount?: number; // Original label: TDS Amount
  AmountClaimed?: number; // Original label: Amount Claimed
  AmountReceived?: number; // Original label: Amount Received
  BcPcPending?: string; // Original label: 50% BC + PC Pending

  constructor(init?: Partial<FiftypercentOfBcDetailsModel>) {
    Object.assign(this, init);
  }
}

export interface OtherAmountDetailsModel {
  OrcCommAmt?: string; // Original label: ORC Comm Amt
  TdsAmt?: string; // Original label: TDS Amt
  AmountClaimed?: number; // Original label: Amount Claimed
  AmountReceived?: number; // Original label: Amount Received
  OrcPending?: string; // Original label: ORC Pending
}

export class OtherAmountDetails implements OtherAmountDetailsModel {
  OrcCommAmt?: string; // Original label: ORC Comm Amt
  TdsAmt?: string; // Original label: TDS Amt
  AmountClaimed?: number; // Original label: Amount Claimed
  AmountReceived?: number; // Original label: Amount Received
  OrcPending?: string; // Original label: ORC Pending

  constructor(init?: Partial<OtherAmountDetailsModel>) {
    Object.assign(this, init);
  }
}

export interface FinalDetailsModel {
  ApartBcOrcComm?: string; // Original label: Apart BC & ORC Comm
  TotalPending?: number; // Original label: Total Pending
}

export class FinalDetails implements FinalDetailsModel {
  ApartBcOrcComm?: string; // Original label: Apart BC & ORC Comm
  TotalPending?: number; // Original label: Total Pending

  constructor(init?: Partial<FinalDetailsModel>) {
    Object.assign(this, init);
  }
}

export interface GstDetailsModel {
  Gst18?: number; // Original label: GST@ 18%
  GstReceived?: number; // Original label: GST Received
  PendingGst?: number; // Original label: Pending GST
}

export class GstDetails implements GstDetailsModel {
  Gst18?: number; // Original label: GST@ 18%
  GstReceived?: number; // Original label: GST Received
  PendingGst?: number; // Original label: Pending GST

  constructor(init?: Partial<GstDetailsModel>) {
    Object.assign(this, init);
  }
}

export interface TotalDetailsModel {
  TotalReceivable?: number; // Original label: Total Receivable
  TotalRecevied?: number; // Original label: Total Recevied
  PendingTotal?: number; // Original label: Pending Total
}

export class TotalDetails implements TotalDetailsModel {
  TotalReceivable?: number; // Original label: Total Receivable
  TotalRecevied?: number; // Original label: Total Recevied
  PendingTotal?: number; // Original label: Pending Total

  constructor(init?: Partial<TotalDetailsModel>) {
    Object.assign(this, init);
  }
}

export interface PayoutDetailsModel {
  Payout?: string; // Original label: Payout %
  PayoutMonth?: string; // Original label: Payout Month
  PayoutAmount?: number; // Original label: Payout Amount
  TdsDeducted?: string; // Original label: TDS Deducted
  NetPayoutAmount?: number; // Original label: Net Payout Amount
  AmountPaid?: number; // Original label: Amount Paid
  BalancePayable?: string; // Original label: Balance Payable
  PayoutStatus?: string; // Original label: Payout Status
  PaidDate?: number; // Original label: Paid Date
  PayeeName?: string; // Original label: Payee Name
  Paymentmode?: string; // Original label: PaymentMode
  BankACNo?: string; // Original label: Bank A/c No
  BankHolderName?: string; // Original label: Bank Holder Name
  BankName?: string; // Original label: Bank Name
  IfscCode?: string; // Original label: IFSC Code
}

export class PayoutDetails implements PayoutDetailsModel {
  Payout?: string; // Original label: Payout %
  PayoutMonth?: string; // Original label: Payout Month
  PayoutAmount?: number; // Original label: Payout Amount
  TdsDeducted?: string; // Original label: TDS Deducted
  NetPayoutAmount?: number; // Original label: Net Payout Amount
  AmountPaid?: number; // Original label: Amount Paid
  BalancePayable?: string; // Original label: Balance Payable
  PayoutStatus?: string; // Original label: Payout Status
  PaidDate?: number; // Original label: Paid Date
  PayeeName?: string; // Original label: Payee Name
  Paymentmode?: string; // Original label: PaymentMode
  BankACNo?: string; // Original label: Bank A/c No
  BankHolderName?: string; // Original label: Bank Holder Name
  BankName?: string; // Original label: Bank Name
  IfscCode?: string; // Original label: IFSC Code

  constructor(init?: Partial<PayoutDetailsModel>) {
    Object.assign(this, init);
  }
}
