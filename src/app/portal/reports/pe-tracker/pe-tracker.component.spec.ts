import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeTrackerComponent } from './pe-tracker.component';

describe('PeTrackerComponent', () => {
  let component: PeTrackerComponent;
  let fixture: ComponentFixture<PeTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeTrackerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
