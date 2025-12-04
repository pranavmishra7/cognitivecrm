export interface ProposerDetailsModel {
  PolicyHolderOrProposer?: string; // Original label: Policy Holder/Proposer
  ProposerDob?: string; // Original label: Proposer DOB (ISO date string)
  Pan?: string; // Original label: PAN
  Aadhar?: string; // Original label: AADHAR
  ContactNumber?: string; // Original label: Contact Number
  EmailId?: string; // Original label: Email ID
  Address?: string; // Original label: Address
  District?: string; // Original label: District (autocomplete)
  State?: string; // Original label: State (autocomplete)
  Country?: string; // Original label: Country (autocomplete)
  PinCode?: string; // Original label: Pin code (autocomplete)
}

export class ProposerDetails implements ProposerDetailsModel {
  PolicyHolderOrProposer?: string;
  ProposerDob?: string;
  Pan?: string;
  Aadhar?: string;
  ContactNumber?: string;
  EmailId?: string;
  Address?: string;
  District?: string;
  State?: string;
  Country?: string;
  PinCode?: string;

  constructor(init?: Partial<ProposerDetailsModel>) {
    Object.assign(this, init);
  }
}