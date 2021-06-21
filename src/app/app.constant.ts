export const API_URL = {
  CALCULATE_LOAN: '/api/calculate',
};

export enum LOAN_CALCULATOR_PARAMETERS {
  MIN_MONTHLY_INCOME = 500,
  MIN_REQUESTED_AMOUNT = 20000,
  MIN_LOAN_TERM = 3,
  MAX_LOAN_TERM = 30,
}

export const SERVER_ERROR_CODES: Record<string, string> = {
  'PARAMETERS MISSING':
    'Unfortunately something went wrong. Please email us at contact@myfakeloanapp.com with subject PARAMETERS' +
    ' MISSING for earliest resolution.',
};
