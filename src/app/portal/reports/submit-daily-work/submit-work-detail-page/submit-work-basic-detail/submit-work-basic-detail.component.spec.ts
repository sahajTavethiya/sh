import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitWorkBasicDetailComponent } from './submit-work-basic-detail.component';

describe('SubmitWorkBasicDetailComponent', () => {
  let component: SubmitWorkBasicDetailComponent;
  let fixture: ComponentFixture<SubmitWorkBasicDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitWorkBasicDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitWorkBasicDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
