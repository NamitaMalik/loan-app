export interface LoanCalculatorFormData {
  monthlyIncome: number;
  requestedAmount: number;
  loanTerm: number;
  children: string;
  coapplicant: string;
}

export interface OfferedLoanData {
  loanAmount: number;
  interestRate: number;
}
