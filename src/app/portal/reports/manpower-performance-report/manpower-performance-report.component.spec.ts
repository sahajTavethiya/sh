import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManpowerPerformanceReportComponent } from './manpower-performance-report.component';

describe('ManpowerPerformanceReportComponent', () => {
  let component: ManpowerPerformanceReportComponent;
  let fixture: ComponentFixture<ManpowerPerformanceReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManpowerPerformanceReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManpowerPerformanceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
