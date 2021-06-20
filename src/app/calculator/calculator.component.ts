import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalculatorService } from './calculator.service';
import { LoanCalculatorFormData, LoanTermOption, OfferedLoanData } from './calculator';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent implements OnInit {
  form: FormGroup;
  loanTermOptions: LoanTermOption[];
  loanSuccessMessage: string = '';

  constructor(
    private _fb: FormBuilder,
    private calcuatorService: CalculatorService
  ) {
    this.loanTermOptions = this.calcuatorService.buildLoanTermOptions();
    this.form = this.buildForm();
  }

  ngOnInit(): void {}

  buildForm(): FormGroup {
    return this._fb.group({
      monthlyIncome: [undefined, [Validators.required, Validators.min(500000)]],
      requestedAmount: [
        undefined,
        [Validators.required, Validators.min(20000000)],
      ],
      loanTerm: [
        undefined,
        [Validators.required, Validators.min(36), Validators.max(360)],
      ],
      children: [undefined, [Validators.required]],
      coapplicant: [undefined, [Validators.required]],
    });
  }

  submit() {
    this.calcuatorService.submitRequest(this.form.value).subscribe((response: OfferedLoanData) => {
      this.loanSuccessMessage = `Congratulations! You can be offered ${response.loanAmount} at the interest rate of ${response.interestRate}. Do you
      want to calculate again?`;
      console.log(response);
    });
  }

  reset(): void {
    this.form.reset();
    this.loanSuccessMessage = '';
  }
}
