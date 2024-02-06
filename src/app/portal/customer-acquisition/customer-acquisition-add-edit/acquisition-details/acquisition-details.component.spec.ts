import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcquisitionDetailsComponent } from './acquisition-details.component';

describe('AcquisitionDetailsComponent', () => {
  let component: AcquisitionDetailsComponent;
  let fixture: ComponentFixture<AcquisitionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcquisitionDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcquisitionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
