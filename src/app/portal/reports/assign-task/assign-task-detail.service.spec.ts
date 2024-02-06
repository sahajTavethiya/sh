import { TestBed } from '@angular/core/testing';

import { AssignTaskDetailService } from './assign-task-detail.service';

describe('AssignTaskDetailService', () => {
  let service: AssignTaskDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignTaskDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
