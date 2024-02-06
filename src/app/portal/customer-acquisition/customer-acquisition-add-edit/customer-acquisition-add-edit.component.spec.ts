import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAcquisitionAddEditComponent } from './customer-acquisition-add-edit.component';

describe('CustomerAcquisitionAddEditComponent', () => {
  let component: CustomerAcquisitionAddEditComponent;
  let fixture: ComponentFixture<CustomerAcquisitionAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerAcquisitionAddEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerAcquisitionAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
