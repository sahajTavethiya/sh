import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeterialReportDetailsComponent } from './meterial-report-details.component';

describe('MeterialReportDetailsComponent', () => {
  let component: MeterialReportDetailsComponent;
  let fixture: ComponentFixture<MeterialReportDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeterialReportDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeterialReportDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
