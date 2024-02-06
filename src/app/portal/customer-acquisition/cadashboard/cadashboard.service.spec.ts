import { TestBed } from '@angular/core/testing';
import { CADashboardService } from './cadashboard.service';


describe('CADashboardService', () => {
  let service: CADashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CADashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
