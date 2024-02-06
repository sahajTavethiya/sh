import { TestBed } from '@angular/core/testing';

import { MaterialIssueService } from './material-issue.service';

describe('MaterialIssueService', () => {
  let service: MaterialIssueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterialIssueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
