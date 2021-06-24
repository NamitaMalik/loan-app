import { TestBed } from '@angular/core/testing';

import { FormService } from './form.service';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MOCK_FORM_FIELDS } from './mocks/calculator-mock.data';

describe('FormService', () => {
  let service: FormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
    });
    service = TestBed.inject(FormService);
  });

  it('is created', () => {
    expect(service).toBeTruthy();
  });

  describe('buildForm', () => {
    it('returns form', () => {
      const form = service.buildForm(MOCK_FORM_FIELDS);
      expect(form instanceof FormGroup).toBe(true);
      expect(Object.keys(form.controls).length).toEqual(
        MOCK_FORM_FIELDS.length
      );
      expect(form.controls[MOCK_FORM_FIELDS[0].formControlName]).toBeDefined();
    });
  });

  describe('buildValidator', () => {
    it('returns validatorFunction', () => {
      expect(JSON.stringify(service.buildValidator({ min: 1000 }))).toEqual(
        JSON.stringify(Validators.min(1000))
      );
    });
  });
});
