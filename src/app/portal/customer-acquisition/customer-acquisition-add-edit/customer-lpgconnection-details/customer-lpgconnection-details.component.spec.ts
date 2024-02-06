import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerLPGConnectionDetailsComponent } from './customer-lpgconnection-details.component';

describe('CustomerLPGConnectionDetailsComponent', () => {
  let component: CustomerLPGConnectionDetailsComponent;
  let fixture: ComponentFixture<CustomerLPGConnectionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerLPGConnectionDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerLPGConnectionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
