import { TestBed } from '@angular/core/testing';

import { DailyProgressReportServiceService } from './daily-progress-report-service.service';

describe('DailyProgressReportServiceService', () => {
  let service: DailyProgressReportServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DailyProgressReportServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
