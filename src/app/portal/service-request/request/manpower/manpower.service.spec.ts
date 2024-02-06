import { TestBed } from '@angular/core/testing';

import { ManpowerService } from './manpower.service';

describe('ManpowerService', () => {
  let service: ManpowerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManpowerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
