import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitDailyWorkComponent } from './submit-daily-work.component';

describe('SubmitDailyWorkComponent', () => {
  let component: SubmitDailyWorkComponent;
  let fixture: ComponentFixture<SubmitDailyWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitDailyWorkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitDailyWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
