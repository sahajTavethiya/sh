import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManpowerAttendanceReportComponent } from './manpower-attendance-report.component';

describe('ManpowerAttendanceReportComponent', () => {
  let component: ManpowerAttendanceReportComponent;
  let fixture: ComponentFixture<ManpowerAttendanceReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManpowerAttendanceReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManpowerAttendanceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
