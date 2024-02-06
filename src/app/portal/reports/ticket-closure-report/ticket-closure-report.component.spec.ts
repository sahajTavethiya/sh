import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketClosureReportComponent } from './ticket-closure-report.component';

describe('TicketClosureReportComponent', () => {
  let component: TicketClosureReportComponent;
  let fixture: ComponentFixture<TicketClosureReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketClosureReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketClosureReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
