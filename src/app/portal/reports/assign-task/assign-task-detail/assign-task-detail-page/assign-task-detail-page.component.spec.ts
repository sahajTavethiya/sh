import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignTaskDetailPageComponent } from './assign-task-detail-page.component';

describe('AssignTaskDetailPageComponent', () => {
  let component: AssignTaskDetailPageComponent;
  let fixture: ComponentFixture<AssignTaskDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignTaskDetailPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignTaskDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
