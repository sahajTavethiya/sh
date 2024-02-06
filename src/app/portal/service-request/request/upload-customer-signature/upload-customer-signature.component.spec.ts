import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadCustomerSignatureComponent } from './upload-customer-signature.component';

describe('UploadCustomerSignatureComponent', () => {
  let component: UploadCustomerSignatureComponent;
  let fixture: ComponentFixture<UploadCustomerSignatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadCustomerSignatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadCustomerSignatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
