import { TestBed } from '@angular/core/testing';
import { CustomerAcquisitionAddEditService } from './customer-acquisition-add-edit.service';


describe('CustomerAcquisitionAddEditService', () => {
  let service: CustomerAcquisitionAddEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerAcquisitionAddEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
