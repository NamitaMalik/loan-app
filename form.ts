import { ValidatorFn } from '@angular/forms';

type FORM_FIELD_TYPES = FORM_FIELDS.INPUT | FORM_FIELDS.SELECT;

export enum FORM_FIELDS {
  INPUT = 'input',
  SELECT = 'select',
}

export type Options = {
  label: string;
  value: string | boolean | number;
};

export interface FormField {
  formControlName: string;
  label: string;
  fieldType: FORM_FIELD_TYPES;
  options?: Options[];
  type?: string;
  validators?: ValidatorFn[];
}
