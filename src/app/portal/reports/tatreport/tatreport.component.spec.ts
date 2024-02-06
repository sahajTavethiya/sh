import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TATReportComponent } from './tatreport.component';

describe('TATReportComponent', () => {
  let component: TATReportComponent;
  let fixture: ComponentFixture<TATReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TATReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TATReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
