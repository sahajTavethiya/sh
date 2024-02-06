import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBankDetailComponent } from './user-bank-detail.component';

describe('UserBankDetailComponent', () => {
  let component: UserBankDetailComponent;
  let fixture: ComponentFixture<UserBankDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserBankDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBankDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
