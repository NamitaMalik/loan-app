import { FORM_FIELDS } from '../../../form';
import { LOAN_CALCULATOR_PARAMETERS } from '../app.constant';

export const MOCK_DATA_TO_SEND = {
  monthlyIncome: 1000,
  requestedAmount: 20000,
  loanTerm: 60,
  children: 'MULTIPLE',
  coapplicant: 'SINGLE_BORROWER',
};

export const MOCK_FORMATTED_DATA_TO_SEND = {
  monthlyIncome: 1000000,
  requestedAmount: 20000000,
  loanTerm: 60,
  children: 'MULTIPLE',
  coapplicant: 'SINGLE_BORROWER',
};

export const MOCK_RESPONSE = {
  loanAmount: 123000000,
  interestRate: 2500,
};

export const MOCK_ERROR_RESPONSE = {
  error: {
    fields: [
      {
        params: 'monthlyIncome',
        message: 'Minimum monthly income should be 2000',
      },
    ],
  },
};

export const MOCK_GENERAL_ERROR_RESPONSE = {
  error: {
    general: {
      code: 'PARAMETERS MISSING',
      message: 'Unfortunately something went wrong',
    },
  },
};

export const MOCK_FIELD_LEVEL_ERROR_MESSAGES = {
  monthlyIncome: 'Minimum monthly income should be 2000',
};

export const MOCK_FORM_FIELDS = [
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
];
