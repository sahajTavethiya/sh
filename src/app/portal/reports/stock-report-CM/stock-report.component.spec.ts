import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockReportCMComponent } from './stock-report.component';

describe('StockReportCMComponent', () => {
  let component: StockReportCMComponent;
  let fixture: ComponentFixture<StockReportCMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockReportCMComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockReportCMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
