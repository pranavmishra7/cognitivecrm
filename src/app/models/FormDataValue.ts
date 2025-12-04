export interface FormDataValue {
  id: string;                 // Guid
  transactionId?: string | null;
  clientId?: string | null;   // Guid?
  formId: string;             // Guid
  sectionId: string;          // Guid
  fieldId: string;            // Guid
  dataValue?: string | null;
  active: boolean;
  isDraft: boolean;
  createdAt: string;          // or Date
  updatedAt?: string | null;  // or Date | null
  createdBy?: string | null;
  updatedBy?: string | null;
}
