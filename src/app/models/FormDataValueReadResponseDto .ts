export interface FormDataValueReadResponseDto {
  id: string;
  transactionId?: string | null;
  clientId?: string | null;

  formName?: string | null;
  formId: string;

  sectionName?: string | null;
  sectionId: string;

  fieldName?: string | null;
  fieldId: string;

  dataValue?: string | null;

  active: boolean;
  isDraft: boolean;

  createdAt: string;       // ISO datetime string
  updatedAt?: string | null;

  createdBy?: string | null;
  updatedBy?: string | null;
}
