import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManpowerTaskTimeComponent } from './manpower-task-time.component';

describe('ManpowerTaskTimeComponent', () => {
  let component: ManpowerTaskTimeComponent;
  let fixture: ComponentFixture<ManpowerTaskTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManpowerTaskTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManpowerTaskTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
