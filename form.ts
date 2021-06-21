import { Validators } from '@angular/forms';

type FORM_FIELD_TYPES = FORM_FIELDS.Input | FORM_FIELDS.Select;

export enum FORM_FIELDS {
  Input = 'input',
  Select = 'select',
}

export type Options = {
  label: string;
  value: string | boolean | number | null;
};

export enum FormValidatorTypes {
  Required = 'required',
  MinValue = 'min',
  MaxValue = 'max',
}

export type FormValidatorType =
  | FormValidatorTypes.Required
  | FormValidatorTypes.MinValue
  | FormValidatorTypes.MaxValue;

export type FormValidatorOption<> = Partial<Record<FormValidatorType, number|boolean>>

export interface FormField {
  formControlName: string;
  label: string;
  fieldType: FORM_FIELD_TYPES;
  options?: Options[];
  type?: string;
  validators?: FormValidatorOption[];
}

export const validators = {
  [FormValidatorTypes.Required]: () => Validators.required,
  [FormValidatorTypes.MaxValue]: (k: FormValidatorTypes, v: FormValidatorOption) =>
    Validators.max(<number>v[k]),
  [FormValidatorTypes.MinValue]: (k: FormValidatorTypes, v: FormValidatorOption) =>
    Validators.min(<number>v[k]),
};
