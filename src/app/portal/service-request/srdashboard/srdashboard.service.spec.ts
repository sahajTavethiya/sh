import { TestBed } from '@angular/core/testing';

import { SRDashboardService } from './srdashboard.service';

describe('SRDashboardService', () => {
  let service: SRDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SRDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
