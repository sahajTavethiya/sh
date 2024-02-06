import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignTaskDetailDialogComponent } from './assign-task-detail-dialog.component';

describe('AssignTaskDetailDialogComponent', () => {
  let component: AssignTaskDetailDialogComponent;
  let fixture: ComponentFixture<AssignTaskDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignTaskDetailDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignTaskDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
