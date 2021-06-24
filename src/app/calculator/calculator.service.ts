import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_KEY, API_URL } from '../app.constant';
import { LoanCalculatorFormData } from './calculator';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  constructor(private http: HttpClient) {}

  submitLoanRequest(data: LoanCalculatorFormData): Observable<any> {
    const headers = new HttpHeaders().set('X-API-KEY', API_KEY);
    return this.http.post(API_URL.CALCULATE_LOAN, this.formatDataToSend(data), {
      headers,
    });
  }

  formatDataToSend(
    dataToFormat: LoanCalculatorFormData
  ): LoanCalculatorFormData {
    const dataToSend = { ...dataToFormat };
    dataToSend.monthlyIncome = dataToSend.monthlyIncome * 1000;
    dataToSend.requestedAmount = dataToSend.requestedAmount * 1000;
    return dataToSend;
  }

  getFormattedAmount(amount: number): number{
    return amount/1000;
  }
}
