import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SRDashboardComponent } from './srdashboard.component';

describe('SRDashboardComponent', () => {
  let component: SRDashboardComponent;
  let fixture: ComponentFixture<SRDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SRDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SRDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
