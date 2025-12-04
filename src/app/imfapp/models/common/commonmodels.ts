// insuranceCommonModels.ts
// TypeScript models for common insurance template sections.
// All models are kept in a single file as requested.

export interface ISourcingDetails {
  sourceId?: string;
  sourceName?: string;
  partnerId?: string;
  partnerName?: string;
  channel?: string; // e.g. Agent, Portal, Aggregator
  sourcedDate?: string; // ISO date string
  remarks?: string;
}

export class SourcingDetails implements ISourcingDetails {
  sourceId?: string;
  sourceName?: string;
  partnerId?: string;
  partnerName?: string;
  channel?: string;
  sourcedDate?: string;
  remarks?: string;

  constructor(init?: Partial<ISourcingDetails>) {
    Object.assign(this, init);
  }
}

export interface IPolicyLoginOrIssuenceDetail {
  policyNumber?: string;
  issuanceDate?: string; // ISO date
  loginId?: string;
  issuedBy?: string;
  status?: string; // e.g. Draft, Issued, Active, Cancelled
  effectiveFrom?: string;
  effectiveTo?: string;
}

export class PolicyLoginOrIssuenceDetail implements IPolicyLoginOrIssuenceDetail {
  policyNumber?: string;
  issuanceDate?: string;
  loginId?: string;
  issuedBy?: string;
  status?: string;
  effectiveFrom?: string;
  effectiveTo?: string;

  constructor(init?: Partial<IPolicyLoginOrIssuenceDetail>) {
    Object.assign(this, init);
  }
}

export interface IPlanAndPremiumDetails {
  planId?: string;
  planName?: string;
  sumInsured?: number;
  premiumAmount?: number;
  premiumCurrency?: string;
  frequency?: string; // e.g. Annual, Monthly
  discounts?: number; // absolute or percentage (clarify in usage)
  loading?: number;
  netPremium?: number;
}

export class PlanAndPremiumDetails implements IPlanAndPremiumDetails {
  planId?: string;
  planName?: string;
  sumInsured?: number;
  premiumAmount?: number;
  premiumCurrency?: string;
  frequency?: string;
  discounts?: number;
  loading?: number;
  netPremium?: number;

  constructor(init?: Partial<IPlanAndPremiumDetails>) {
    Object.assign(this, init);
  }
}

export interface IRevenueDetails {
  revenueCode?: string;
  revenueAmount?: number;
  collectionDate?: string;
  collectedBy?: string;
  taxable?: boolean;
}

export class RevenueDetails implements IRevenueDetails {
  revenueCode?: string;
  revenueAmount?: number;
  collectionDate?: string;
  collectedBy?: string;
  taxable?: boolean;

  constructor(init?: Partial<IRevenueDetails>) {
    Object.assign(this, init);
  }
}

export interface IBaseDetails {
  transactionId?: string;
  createdBy?: string;
  createdDate?: string;
  modifiedBy?: string;
  modifiedDate?: string;
  referenceNotes?: string;
}

export class BaseDetails implements IBaseDetails {
  transactionId?: string;
  createdBy?: string;
  createdDate?: string;
  modifiedBy?: string;
  modifiedDate?: string;
  referenceNotes?: string;

  constructor(init?: Partial<IBaseDetails>) {
    Object.assign(this, init);
  }
}

export interface IPCDetails {
  pcCode?: string;
  pcName?: string;
  commissionPercent?: number;
  commissionAmount?: number;
}

export class PCDetails implements IPCDetails {
  pcCode?: string;
  pcName?: string;
  commissionPercent?: number;
  commissionAmount?: number;

  constructor(init?: Partial<IPCDetails>) {
    Object.assign(this, init);
  }
}

export interface IFiftyPercentOfBCDetails {
  baseCommission?: number;
  fiftyPercentOfBC?: number; // usually baseCommission * 0.5
}

export class FiftyPercentOfBCDetails implements IFiftyPercentOfBCDetails {
  baseCommission?: number;
  fiftyPercentOfBC?: number;

  constructor(init?: Partial<IFiftyPercentOfBCDetails>) {
    Object.assign(this, init);
  }
}

export interface IOtherAmountDetails {
  otherCharges?: number;
  otherChargeDescription?: string;
  adjustments?: number; // positive or negative adjustments
}

export class OtherAmountDetails implements IOtherAmountDetails {
  otherCharges?: number;
  otherChargeDescription?: string;
  adjustments?: number;

  constructor(init?: Partial<IOtherAmountDetails>) {
    Object.assign(this, init);
  }
}

export interface IFinalDetails {
  grossPremium?: number;
  totalDeductions?: number;
  totalAdditions?: number;
  payableAmount?: number; // gross + additions - deductions
}

export class FinalDetails implements IFinalDetails {
  grossPremium?: number;
  totalDeductions?: number;
  totalAdditions?: number;
  payableAmount?: number;

  constructor(init?: Partial<IFinalDetails>) {
    Object.assign(this, init);
  }
}

export interface IGSTDetails {
  gstRate?: number; // percentage
  gstAmount?: number;
  gstRegistrationNumber?: string;
}

export class GSTDetails implements IGSTDetails {
  gstRate?: number;
  gstAmount?: number;
  gstRegistrationNumber?: string;

  constructor(init?: Partial<IGSTDetails>) {
    Object.assign(this, init);
  }
}

export interface ITotalDetails {
  subTotal?: number;
  totalTax?: number;
  grandTotal?: number;
}

export class TotalDetails implements ITotalDetails {
  subTotal?: number;
  totalTax?: number;
  grandTotal?: number;

  constructor(init?: Partial<ITotalDetails>) {
    Object.assign(this, init);
  }
}

export interface IPayoutDetails {
  payoutAmount?: number;
  payoutMode?: string; // e.g. Bank Transfer, Cheque
  payoutAccount?: string;
  payoutDate?: string;
  payoutStatus?: string; // e.g. Pending, Completed
}

export class PayoutDetails implements IPayoutDetails {
  payoutAmount?: number;
  payoutMode?: string;
  payoutAccount?: string;
  payoutDate?: string;
  payoutStatus?: string;

  constructor(init?: Partial<IPayoutDetails>) {
    Object.assign(this, init);
  }
}

// Aggregate model that groups all common sections for easy use in forms/services
export interface ICommonInsuranceSections {
  sourcingDetails?: ISourcingDetails;
  policyLoginOrIssuenceDetail?: IPolicyLoginOrIssuenceDetail;
  planAndPremiumDetails?: IPlanAndPremiumDetails;
  revenueDetails?: IRevenueDetails;
  baseDetails?: IBaseDetails;
  pcDetails?: IPCDetails;
  fiftyPercentOfBCDetails?: IFiftyPercentOfBCDetails;
  otherAmountDetails?: IOtherAmountDetails;
  finalDetails?: IFinalDetails;
  gstDetails?: IGSTDetails;
  totalDetails?: ITotalDetails;
  payoutDetails?: IPayoutDetails;
}

export class CommonInsuranceSections implements ICommonInsuranceSections {
  sourcingDetails?: SourcingDetails;
  policyLoginOrIssuenceDetail?: PolicyLoginOrIssuenceDetail;
  planAndPremiumDetails?: PlanAndPremiumDetails;
  revenueDetails?: RevenueDetails;
  baseDetails?: BaseDetails;
  pcDetails?: PCDetails;
  fiftyPercentOfBCDetails?: FiftyPercentOfBCDetails;
  otherAmountDetails?: OtherAmountDetails;
  finalDetails?: FinalDetails;
  gstDetails?: GSTDetails;
  totalDetails?: TotalDetails;
  payoutDetails?: PayoutDetails;

  constructor(init?: Partial<ICommonInsuranceSections>) {
    if (!init) return;
    this.sourcingDetails = init.sourcingDetails ? new SourcingDetails(init.sourcingDetails) : undefined;
    this.policyLoginOrIssuenceDetail = init.policyLoginOrIssuenceDetail ? new PolicyLoginOrIssuenceDetail(init.policyLoginOrIssuenceDetail) : undefined;
    this.planAndPremiumDetails = init.planAndPremiumDetails ? new PlanAndPremiumDetails(init.planAndPremiumDetails) : undefined;
    this.revenueDetails = init.revenueDetails ? new RevenueDetails(init.revenueDetails) : undefined;
    this.baseDetails = init.baseDetails ? new BaseDetails(init.baseDetails) : undefined;
    this.pcDetails = init.pcDetails ? new PCDetails(init.pcDetails) : undefined;
    this.fiftyPercentOfBCDetails = init.fiftyPercentOfBCDetails ? new FiftyPercentOfBCDetails(init.fiftyPercentOfBCDetails) : undefined;
    this.otherAmountDetails = init.otherAmountDetails ? new OtherAmountDetails(init.otherAmountDetails) : undefined;
    this.finalDetails = init.finalDetails ? new FinalDetails(init.finalDetails) : undefined;
    this.gstDetails = init.gstDetails ? new GSTDetails(init.gstDetails) : undefined;
    this.totalDetails = init.totalDetails ? new TotalDetails(init.totalDetails) : undefined;
    this.payoutDetails = init.payoutDetails ? new PayoutDetails(init.payoutDetails) : undefined;
  }
}
