export interface ImfErrors { code: string; details: string; trace: string; }
export interface ImfResponse<T> { errors: ImfErrors[]; data: T; message: string; success: boolean; }

export interface FieldConfigDto {
  id: string;
  clientId?: string | null;
  sectionId?: string | null;
  fieldName: string;
  fieldOrder: number;
  type: string | null;
  label: string;
  placeholder: string;
  options: string | null;
  optionList?: string[];
  required: boolean;
  validationMessage: string | null;
  defaultValue: string | null;
}

export interface SectionDto {
  id: string | null;
  clientId?: string | null;
  formId?: string | null;
  sectionName: string;
  displayOrder: number;
  fields: FieldConfigDto[];
}

export interface FormDto {
  id: string | null;
  clientId?: string | null;
  formName: string;
  sections: SectionDto[];
}

export interface ImportFieldsRequest {
  clientId?: string | null;
  formName: string;
  sections: SectionDto[];
}


