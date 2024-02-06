import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubmitWorkDetailPopupComponent } from './add-submit-work-detail-popup.component';

describe('AddSubmitWorkDetailPopupComponent', () => {
  let component: AddSubmitWorkDetailPopupComponent;
  let fixture: ComponentFixture<AddSubmitWorkDetailPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSubmitWorkDetailPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubmitWorkDetailPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
