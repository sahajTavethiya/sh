import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyProgressReportComponent } from './daily-progress-report.component';

describe('DailyProgressReportComponent', () => {
  let component: DailyProgressReportComponent;
  let fixture: ComponentFixture<DailyProgressReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyProgressReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyProgressReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
