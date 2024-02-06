import { TestBed } from '@angular/core/testing';

import { StockReportServiceService } from './stock-report-service.service';

describe('StockReportServiceService', () => {
  let service: StockReportServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockReportServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
