import { TestBed } from '@angular/core/testing';
import { AcquisitionDetailService } from './acquisition-detail.service';


describe('AcquisitionDetailService', () => {
  let service: AcquisitionDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcquisitionDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
