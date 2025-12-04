export * from './form-schema';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// src/app/utils/validators.util.ts

export const buildValidator = (name: string, value?: any): ValidatorFn => {
switch (name) {
case 'required': return (c: AbstractControl) => (c.value == null || c.value === '' ? { required: true } : null);
case 'min': return (c) => (c.value != null && +c.value < +value ? { min: { min: +value, actual: +c.value } } : null);
case 'max': return (c) => (c.value != null && +c.value > +value ? { max: { max: +value, actual: +c.value } } : null);
case 'minLength': return (c) => (c.value && c.value.length < +value ? { minlength: { requiredLength: +value, actualLength: c.value.length } } : null);
case 'maxLength': return (c) => (c.value && c.value.length > +value ? { maxlength: { requiredLength: +value, actualLength: c.value.length } } : null);
case 'pattern': return (c) => (c.value && !(new RegExp(String(value))).test(c.value) ? { pattern: true } : null);
case 'email': return (c) => (/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(c.value) ? null : { email: true });
default: return () => null;
}
}