import { TestBed } from '@angular/core/testing';

import { StockCMService } from './stock-cm.service';

describe('StockCMService', () => {
  let service: StockCMService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockCMService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
