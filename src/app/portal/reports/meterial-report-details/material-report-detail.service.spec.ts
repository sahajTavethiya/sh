import { TestBed } from '@angular/core/testing';

import { MaterialReportDetailService } from './material-report-detail.service';

describe('MaterialReportDetailService', () => {
  let service: MaterialReportDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterialReportDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
