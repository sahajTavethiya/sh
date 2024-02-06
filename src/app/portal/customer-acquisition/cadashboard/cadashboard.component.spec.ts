import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadashboardComponent } from './cadashboard.component';

describe('CadashboardComponent', () => {
  let component: CadashboardComponent;
  let fixture: ComponentFixture<CadashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
