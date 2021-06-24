import { TestBed } from '@angular/core/testing';

import { CalculatorService } from './calculator.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  MOCK_DATA_TO_SEND,
  MOCK_FORMATTED_DATA_TO_SEND,
  MOCK_RESPONSE,
} from '../mocks/calculator-mock.data';
import { API_URL } from '../app.constant';

describe('CalculatorService', () => {
  let service: CalculatorService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CalculatorService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('submitLoanRequest', () => {
    it('calls formatDataToSend to build data in correct format', () => {
      spyOn(service, 'formatDataToSend');
      service
        .submitLoanRequest(MOCK_DATA_TO_SEND)
        .subscribe((_) =>
          expect(service.formatDataToSend).toHaveBeenCalledOnceWith(
            MOCK_DATA_TO_SEND
          )
        );
      const httpRequest = httpTestingController.expectOne(
        API_URL.CALCULATE_LOAN
      );
      httpRequest.flush(MOCK_RESPONSE);
      expect(httpRequest.request.method).toEqual('POST');
    });
    it('makes HTTP request to submit loan request', () => {
      service.submitLoanRequest(MOCK_DATA_TO_SEND).subscribe((data) => {
        expect(data).toEqual(MOCK_RESPONSE);
      });
      const httpRequest = httpTestingController.expectOne(
        API_URL.CALCULATE_LOAN
      );
      httpRequest.flush(MOCK_RESPONSE);
      expect(httpRequest.request.method).toEqual('POST');
    });
  });

  describe('formatDataToSend', () => {
    it('formats data in the correct format', () => {
      expect(service.formatDataToSend(MOCK_DATA_TO_SEND)).toEqual(
        MOCK_FORMATTED_DATA_TO_SEND
      );
    });
  });
});
