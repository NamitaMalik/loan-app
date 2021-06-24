import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';
import {
  FormField,
  FormValidatorOption,
  FormValidatorTypes,
  validators,
} from '../../form';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor(private _fb: FormBuilder) {}

  buildForm(formFields: FormField[]): FormGroup {
    const form = this._fb.group([]);
    formFields.forEach((formField) => {
      let validators: ValidatorFn[] = [];
      formField.validators?.forEach((validator) => {
        validators = [...validators, this.buildValidator(validator)];
      });
      form.addControl(
        formField.formControlName,
        this._fb.control(null, { validators })
      );
    });
    return form;
  }

  buildValidator(formValidatorOptions: FormValidatorOption): ValidatorFn {
    const key = <FormValidatorTypes>Object.keys(formValidatorOptions)[0];
    return validators[key](key, formValidatorOptions);
  }
}
