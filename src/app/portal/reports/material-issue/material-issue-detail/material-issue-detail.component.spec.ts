import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialIssueDetailComponent } from './material-issue-detail.component';

describe('MaterialIssueDetailComponent', () => {
  let component: MaterialIssueDetailComponent;
  let fixture: ComponentFixture<MaterialIssueDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialIssueDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialIssueDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
