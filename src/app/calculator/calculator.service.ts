import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from '../app.constant';
import { LoanCalculatorFormData, LoanTermOption } from './calculator';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  constructor(private http: HttpClient) {}

  submitRequest(data: LoanCalculatorFormData): Observable<any> {
    const headers = new HttpHeaders().set('X-API-KEY', ' swb-222222');
    return this.http.post(API_URL.CALCULATE_LOAN, data, { headers });
  }

  buildLoanTermOptions(minimumYears = 3, maximumYears = 30): LoanTermOption[] {
    const monthsInYear = 12;
    const options = [];
    for (let i = minimumYears; i <= maximumYears; i++) {
      options.push({ value: i*monthsInYear, displayValue: `${i} years` });
    }
    return options;
  }
}
