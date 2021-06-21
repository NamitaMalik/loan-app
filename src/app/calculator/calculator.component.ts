import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CalculatorService } from './calculator.service';
import { OfferedLoanData } from './calculator';
import { HttpErrorResponse } from '@angular/common/http';
import { LOAN_FORM_FIELDS } from '../loan-calculator.form';
import { FORM_FIELDS, FormField } from '../../../form';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent {
  form: FormGroup;
  formFieldType = FORM_FIELDS;
  loanSuccessMessage: string = '';
  serverErrorMessages: any = {};
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
      form.addControl(
        formField.formControlName,
        this._fb.control(undefined, { validators: formField.validators })
      );
    });
    return form;
  }

  submit(): void {
    this.calcuatorService.submitRequest(this.form.value).subscribe(
      (response: OfferedLoanData) => {
        this.loanSuccessMessage = `Congratulations! You can be offered ${
          response.loanAmount / 1000
        } at the interest rate of ${response.interestRate / 1000}. Do you
      want to calculate again?`;
      },
      (error: HttpErrorResponse) => {
        const errorFields = error.error?.fields;
        if (errorFields.length) {
          errorFields.forEach(
            (errorField: { params: string; message: string }) => {
              this.serverErrorMessages[errorField.params] = errorField.message;
            }
          );
        }
      }
    );
  }

  reset(): void {
    this.form.reset();
    this.loanSuccessMessage = '';
    this.serverErrorMessages = {};
  }
}
