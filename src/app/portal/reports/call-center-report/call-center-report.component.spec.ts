import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallCenterReportComponent } from './call-center-report.component';

describe('CallCenterReportComponent', () => {
  let component: CallCenterReportComponent;
  let fixture: ComponentFixture<CallCenterReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallCenterReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CallCenterReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
