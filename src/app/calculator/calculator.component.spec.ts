import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorComponent } from './calculator.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CalculatorService } from './calculator.service';
import { of, throwError } from 'rxjs';
import {
  MOCK_ERROR_RESPONSE,
  MOCK_FIELD_LEVEL_ERROR_MESSAGES,
  MOCK_GENERAL_ERROR_RESPONSE,
  MOCK_RESPONSE,
} from '../mocks/calculator-mock.data';
import { HttpErrorResponse } from '@angular/common/http';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;
  let calculatorService: CalculatorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalculatorComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    calculatorService = TestBed.inject(CalculatorService);
    fixture.detectChanges();
  });

  it('is created', () => {
    expect(component).toBeTruthy();
  });

  describe('buildLoanTermOptions', () => {
    it('returns loan term options for display', () => {
      expect(component.buildLoanTermOptions().length).toEqual(28);
      expect(component.buildLoanTermOptions()[0]).toEqual({
        value: 36,
        label: '3 years',
      });
      expect(component.buildLoanTermOptions()[27]).toEqual({
        value: 360,
        label: '30 years',
      });
    });
  });

  describe('submitLoanRequest', () => {
    it('resets fieldLevelErrorMessages', () => {
      component.fieldLevelErrorMessages = {
        monthlyIncome: 'Monthly income is too low',
      };
      component.submitLoanRequest();
      expect(component.fieldLevelErrorMessages).toEqual({});
    });

    it('calls submitLoanRequest function on calculatorService', () => {
      spyOn(calculatorService, 'submitLoanRequest').and.returnValue(
        of(MOCK_RESPONSE)
      );
      component.submitLoanRequest();
      expect(calculatorService.submitLoanRequest).toHaveBeenCalledTimes(1);
    });

    it('calls onSuccess when submitLoanRequest function on calculatorService returns a success', () => {
      spyOn(component, 'onSuccess');
      spyOn(calculatorService, 'submitLoanRequest').and.returnValue(
        of(MOCK_RESPONSE)
      );
      component.submitLoanRequest();
      expect(component.onSuccess).toHaveBeenCalledOnceWith(MOCK_RESPONSE);
    });

    it('calls onError when submitLoanRequest function on calculatorService returns error', () => {
      const error = new HttpErrorResponse({});
      spyOn(component, 'onError');
      spyOn(calculatorService, 'submitLoanRequest').and.returnValue(
        throwError(error)
      );
      component.submitLoanRequest();
      expect(component.onError).toHaveBeenCalledOnceWith(error);
    });
  });

  describe('onSuccess', () => {
    it('sets form in untouched state', () => {
      component.form.markAsTouched();
      expect(component.form.touched).toBe(true);
      component.onSuccess(MOCK_RESPONSE);
      expect(component.form.touched).toBe(false);
    });

    it('disables form', () => {
      component.form.enable();
      expect(component.form.disabled).toBe(false);
      component.onSuccess(MOCK_RESPONSE);
      expect(component.form.disabled).toBe(true);
    });

    it('sets success message', () => {
      component.onSuccess(MOCK_RESPONSE);
      expect(component.loanSuccessMessage).toBe(
        'Congratulations! You can be offered 123000 at the interest rate of 2.5%. Do you want to re-calculate?'
      );
    });
  });

  describe('onError', () => {
    it('sets form in untouched state', () => {
      const error = new HttpErrorResponse(MOCK_ERROR_RESPONSE);
      component.form.markAsTouched();
      expect(component.form.touched).toBe(true);
      component.onError(error);
      expect(component.form.touched).toBe(false);
    });

    it('sets field level error messages', () => {
      const error = new HttpErrorResponse(MOCK_ERROR_RESPONSE);
      component.onError(error);
      expect(component.fieldLevelErrorMessages).toEqual(
        MOCK_FIELD_LEVEL_ERROR_MESSAGES
      );
    });

    it('sets general error', () => {
      const error = new HttpErrorResponse(MOCK_GENERAL_ERROR_RESPONSE);
      component.onError(error);
      expect(component.serverErrorMessage).toBe(
        'Unfortunately something went wrong. Please email us at contact@myfakeloanapp.com with' +
          ' subject PARAMETERS MISSING for earliest resolution.'
      );
    });

    it('does not set general error when error is undefined', () => {
      const error = new HttpErrorResponse({});
      component.onError(error);
      expect(component.serverErrorMessage).toBe('');
    });

    it('does not set field level error messages when error is undefined', () => {
      const error = new HttpErrorResponse({});
      component.onError(error);
      expect(component.fieldLevelErrorMessages).toEqual({});
    });
  });

  describe('reset', () => {
    it('resets form when resetForm flag is true', () => {
      spyOn(component.form, 'reset');
      component.reset(true);
      expect(component.form.reset).toHaveBeenCalled();
    });
    it('enables form', () => {
      component.form.disable();
      component.reset();
      expect(component.form.enabled).toBe(true);
    });
    it('resets loanSuccessMessage', () => {
      component.loanSuccessMessage = 'success';
      component.reset();
      expect(component.loanSuccessMessage).toBe('');
    });
    it('resets fieldLevelErrorMessages', () => {
      component.fieldLevelErrorMessages = MOCK_FIELD_LEVEL_ERROR_MESSAGES;
      component.reset();
      expect(component.fieldLevelErrorMessages).toEqual({});
    });
  });
});
