import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitWorkDetailPageComponent } from './submit-work-detail-page.component';

describe('SubmitWorkDetailPageComponent', () => {
  let component: SubmitWorkDetailPageComponent;
  let fixture: ComponentFixture<SubmitWorkDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitWorkDetailPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitWorkDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
