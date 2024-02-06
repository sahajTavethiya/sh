import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicDetailOfUserComponent } from './basic-detail-of-user.component';

describe('BasicDetailOfUserComponent', () => {
  let component: BasicDetailOfUserComponent;
  let fixture: ComponentFixture<BasicDetailOfUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicDetailOfUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicDetailOfUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
