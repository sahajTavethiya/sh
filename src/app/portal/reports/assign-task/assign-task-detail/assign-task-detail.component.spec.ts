import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignTaskDetailComponent } from './assign-task-detail.component';

describe('AssignTaskDetailComponent', () => {
  let component: AssignTaskDetailComponent;
  let fixture: ComponentFixture<AssignTaskDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignTaskDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignTaskDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
