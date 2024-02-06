import { TestBed } from '@angular/core/testing';

import { MeterMasterService } from './meterMaster.service';

describe('DashboardService', () => {
  let service: MeterMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeterMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
