import { TestBed } from '@angular/core/testing';
import { CustomerLPGConnectionDetailsService } from './customer-lpgconnection-details.service';


describe('CustomerLPGConnectionDetailsService', () => {
  let service: CustomerLPGConnectionDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerLPGConnectionDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
