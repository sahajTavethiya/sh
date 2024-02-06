import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncompleteSRStatusReportComponent } from './incomplete-srstatus-report.component';

describe('IncompleteSRStatusReportComponent', () => {
  let component: IncompleteSRStatusReportComponent;
  let fixture: ComponentFixture<IncompleteSRStatusReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncompleteSRStatusReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncompleteSRStatusReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
