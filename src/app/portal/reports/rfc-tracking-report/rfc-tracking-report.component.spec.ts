import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RFCTrackingReportComponent } from './rfc-tracking-report.component';

describe('RFCTrackingReportComponent', () => {
  let component: RFCTrackingReportComponent;
  let fixture: ComponentFixture<RFCTrackingReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RFCTrackingReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RFCTrackingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
