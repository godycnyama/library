import { TestBed, inject } from '@angular/core/testing';

import { LoaningService } from './loaning.service';

describe('LoaningService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoaningService]
    });
  });

  it('should be created', inject([LoaningService], (service: LoaningService) => {
    expect(service).toBeTruthy();
  }));
});
