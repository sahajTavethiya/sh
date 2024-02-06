import { TestBed } from '@angular/core/testing';

import { ContractorReconciliationServiceService } from './contractor-reconciliation-service.service';

describe('ContractorReconciliationServiceService', () => {
  let service: ContractorReconciliationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContractorReconciliationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
