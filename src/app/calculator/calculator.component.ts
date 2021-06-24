import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CalculatorService } from './calculator.service';
import { FieldError, OfferedLoanData } from './calculator';
import { HttpErrorResponse } from '@angular/common/http';
import { FORM_FIELDS, FormField, Options } from '../../../form';
import {
  LOAN_CALCULATOR_PARAMETERS,
  SERVER_ERROR_CODES,
} from '../app.constant';
import { FormService } from '../form.service';
import { LOAN_FORM_FIELDS } from './loan-calculator.form.constant';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent {
  form: FormGroup;
  formFieldType = FORM_FIELDS;
  formFields: FormField[];
  loanSuccessMessage: string = '';
  serverErrorMessage: string = '';
  fieldLevelErrorMessages: Record<string, string> = {};

  constructor(
    private formService: FormService,
    private calculatorService: CalculatorService
  ) {
    this.formFields = LOAN_FORM_FIELDS(this.buildLoanTermOptions());
    this.form = this.formService.buildForm(this.formFields);
  }

  buildLoanTermOptions(): Options[] {
    const options = [];
    for (
      let i = LOAN_CALCULATOR_PARAMETERS.MIN_LOAN_TERM;
      i <= LOAN_CALCULATOR_PARAMETERS.MAX_LOAN_TERM;
      i++
    ) {
      options.push({
        value: i * LOAN_CALCULATOR_PARAMETERS.MONTHS_IN_YEAR,
        label: `${i} years`,
      });
    }
    return options;
  }

  submitLoanRequest(): void {
    this.fieldLevelErrorMessages = {};
    this.calculatorService.submitLoanRequest(this.form.value).subscribe(
      (response) => this.onSuccess(response),
      (error: HttpErrorResponse) => this.onError(error)
    );
  }

  onSuccess(response: OfferedLoanData) {
    this.form.markAsUntouched();
    this.form.disable();
    this.loanSuccessMessage = `Congratulations! You can be offered ${this.calculatorService.getFormattedAmount(
      response.loanAmount
    )} at the interest rate of ${this.calculatorService.getFormattedAmount(
      response.interestRate
    )}%. Do you want to re-calculate?`;
  }

  onError(error: HttpErrorResponse) {
    this.form.markAsUntouched();
    const fieldsWithErrors: FieldError[] = error.error?.fields;
    if (fieldsWithErrors?.length) {
      fieldsWithErrors.forEach((errorField) => {
        this.fieldLevelErrorMessages[errorField.params] = errorField.message;
      });
    }
    const generalError: { code: string; message: string } =
      error.error?.general;
    if (generalError) {
      this.serverErrorMessage = SERVER_ERROR_CODES[generalError.code];
    }
  }

  reset(resetForm?: boolean): void {
    this.form.enable();
    if (resetForm) {
      this.form.reset();
    }
    this.loanSuccessMessage = '';
    this.fieldLevelErrorMessages = {};
  }
}
