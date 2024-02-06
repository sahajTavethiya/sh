import { TestBed } from '@angular/core/testing';

import { OrderReportServiceService } from './order-report-service.service';

describe('OrderReportServiceService', () => {
  let service: OrderReportServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderReportServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
