import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedManpowerComponent } from './assigned-manpower.component';

describe('AssignedManpowerComponent', () => {
  let component: AssignedManpowerComponent;
  let fixture: ComponentFixture<AssignedManpowerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignedManpowerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignedManpowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
