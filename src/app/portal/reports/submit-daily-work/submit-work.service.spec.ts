import { TestBed } from '@angular/core/testing';

import { SubmitWorkService } from './submit-work.service';

describe('SubmitWorkService', () => {
  let service: SubmitWorkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubmitWorkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
