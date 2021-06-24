import { FORM_FIELDS, FormField, Options } from '../../../form';
import { LOAN_CALCULATOR_PARAMETERS } from '../app.constant';

export const LOAN_FORM_FIELDS = (loanTermOptions: Options[]): FormField[] => [
  {
    formControlName: 'monthlyIncome',
    label: 'Monthly Income',
    fieldType: FORM_FIELDS.Input,
    type: 'number',
    validators: [
      { required: true },
      { min: LOAN_CALCULATOR_PARAMETERS.MIN_MONTHLY_INCOME },
    ],
  },
  {
    formControlName: 'requestedAmount',
    label: 'Requested Amount',
    fieldType: FORM_FIELDS.Input,
    type: 'number',
    validators: [
      { required: true },
      { min: LOAN_CALCULATOR_PARAMETERS.MIN_REQUESTED_AMOUNT },
    ],
  },
  {
    formControlName: 'loanTerm',
    label: 'Loan Term',
    fieldType: FORM_FIELDS.Select,
    options: [{ label: 'Select', value: null }, ...loanTermOptions],
  },
  {
    formControlName: 'children',
    label: 'Children',
    fieldType: FORM_FIELDS.Select,
    options: [
      { label: 'Select', value: null },
      { label: 'None', value: 'NONE' },
      { label: 'Single', value: 'SINGLE' },
      { label: 'Multiple', value: 'MULTIPLE' },
    ],
  },
  {
    formControlName: 'coapplicant',
    label: 'Co-applicant',
    fieldType: FORM_FIELDS.Select,
    options: [
      { label: 'Select', value: null },
      { label: 'None', value: 'NONE' },
      { label: 'Single Borrower', value: 'SINGLE_BORROWER' },
      { label: 'Multiple Borrower', value: 'MULTIPLE_BORROWERS' },
    ],
  },
];
