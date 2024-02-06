import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserContactDetailComponent } from './add-user-contact-detail.component';

describe('AddUserContactDetailComponent', () => {
  let component: AddUserContactDetailComponent;
  let fixture: ComponentFixture<AddUserContactDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUserContactDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserContactDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
