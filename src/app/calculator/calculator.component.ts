import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalculatorService } from './calculator.service';
import { LoanTermOption, OfferedLoanData } from './calculator';
import { HttpErrorResponse } from '@angular/common/http';
import { LOAN_CALCULATOR_PARAMETERS } from '../app.constant';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent {
  form: FormGroup;
  loanTermOptions: LoanTermOption[];
  loanSuccessMessage: string = '';
  serverErrorMessages: any = {};
  loanCalculatorParameters = LOAN_CALCULATOR_PARAMETERS;

  constructor(
    private _fb: FormBuilder,
    private calcuatorService: CalculatorService
  ) {
    this.loanTermOptions = this.calcuatorService.buildLoanTermOptions();
    this.form = this.buildForm();
  }

  buildForm(): FormGroup {
    return this._fb.group({
      monthlyIncome: [
        undefined,
        [Validators.min(this.loanCalculatorParameters.MIN_MONTHLY_INCOME)],
      ],
      requestedAmount: [
        undefined,
        [Validators.min(this.loanCalculatorParameters.MIN_REQUESTED_AMOUNT)],
      ],
      loanTerm: [
        undefined,
        [
          Validators.min(this.loanCalculatorParameters.MIN_LOAN_TERM),
          Validators.max(this.loanCalculatorParameters.MAX_LOAN_TERM),
        ],
      ],
      children: [undefined],
      coapplicant: [undefined],
    });
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
