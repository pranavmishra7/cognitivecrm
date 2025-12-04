
export type FieldType =
| 'text'
| 'number'
| 'date'
| 'textarea'
| 'checkbox'
| 'radio'
| 'dropdown'
| 'autocomplete'
| 'button';

export interface OptionItem { value: string; label: string; }


export interface ValidationRule {
name: 'required' | 'min' | 'max' | 'minLength' | 'maxLength' | 'pattern' | 'email';
value?: number | string;
message?: string; // Error message
}


export interface WarningRule {
// Same shape as ValidationRule but treated as non-blocking “warnings”
name: 'min' | 'max' | 'pattern' | 'custom';
value?: number | string;
message: string; // Warning text shown non-blocking
}


export interface ConditionalVisibility {
// e.g. show field B when field A === 'Yes'
dependsOnFieldId: string;
operator: 'equals' | 'notEquals' | 'gt' | 'gte' | 'lt' | 'lte' | 'includes' | 'regex';
value: any;
}


export interface FieldSchema {
id: string; // stable GUID
key: string; // form control name
label: string;
type: FieldType;
placeholder?: string;
helpText?: string;
required?: boolean; // convenience flag (will auto add required validation)
options?: OptionItem[]; // for dropdown/radio/autocomplete
multiple?: boolean; // for dropdown/autocomplete
min?: number; // for number/date
max?: number; // for number/date
step?: number; // for number
validations?: ValidationRule[];
warnings?: WarningRule[]; // non-blocking guidance
conditional?: ConditionalVisibility;
ui?: {
width?: 'full' | '1/2' | '1/3' | '1/4';
row?: number; // layout hint
};
// Field-specific extras
autocomplete?: {
minChars?: number; // start filtering after N chars
caseSensitive?: boolean;
};
}


export interface FormSchema {
id: string; // schema id
name: string;
ownerUserId: string;
version: number;
createdAt: string; // ISO date
updatedAt: string;
fields: FieldSchema[];
}