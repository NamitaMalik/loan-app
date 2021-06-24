import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';
import { CalculatorService } from './calculator.service';
import { OfferedLoanData } from './calculator';
import { HttpErrorResponse } from '@angular/common/http';
import { LOAN_FORM_FIELDS } from '../loan-calculator.form';
import {
  FORM_FIELDS,
  FormField,
  FormValidatorOption,
  FormValidatorTypes,
  validators,
} from '../../../form';
import { SERVER_ERROR_CODES } from '../app.constant';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent {
  form: FormGroup;
  formFieldType = FORM_FIELDS;
  loanSuccessMessage: string = '';
  serverErrorMessage: string = '';
  fieldLevelErrorMessages: any = {};
  formFields: FormField[];

  constructor(
    private _fb: FormBuilder,
    private calcuatorService: CalculatorService
  ) {
    this.formFields = LOAN_FORM_FIELDS(
      this.calcuatorService.buildLoanTermOptions()
    );
    this.form = this.buildForm();
  }

  buildForm(): FormGroup {
    const form = this._fb.group([]);
    this.formFields.forEach((formField) => {
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

  submit(): void {
    this.fieldLevelErrorMessages = {};
    this.calcuatorService.submitRequest(this.form.value).subscribe(
      (response: OfferedLoanData) => {
        this.form.markAsUntouched();
        this.form.disable();
        this.loanSuccessMessage = `Congratulations! You can be offered ${
          response.loanAmount / 1000
        } at the interest rate of ${response.interestRate / 1000}. Do you
      want to re-calculate?`;
      },
      (error: HttpErrorResponse) => {
        this.form.markAsUntouched();
        const errorFields: { params: string; message: string }[] =
          error.error?.fields;
        if (errorFields.length) {
          errorFields.forEach((errorField) => {
            this.fieldLevelErrorMessages[errorField.params] =
              errorField.message;
          });
        }
        const generalError: { code: string; message: string } =
          error.error?.general;
        if (generalError) {
          this.serverErrorMessage = SERVER_ERROR_CODES[generalError.code];
        }
      }
    );
  }

  reset(resetForm?: boolean): void {
    this.form.enable();
    if(resetForm) {
      this.form.reset();
    }
    this.loanSuccessMessage = '';
    this.fieldLevelErrorMessages = {};
  }
}
