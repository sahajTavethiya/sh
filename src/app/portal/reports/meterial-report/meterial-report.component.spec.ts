import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeterialReportComponent } from './meterial-report.component';

describe('MeterialReportComponent', () => {
  let component: MeterialReportComponent;
  let fixture: ComponentFixture<MeterialReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeterialReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeterialReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
