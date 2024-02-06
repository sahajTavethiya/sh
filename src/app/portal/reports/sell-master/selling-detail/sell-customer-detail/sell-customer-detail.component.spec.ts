import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellCustomerDetailComponent } from './sell-customer-detail.component';

describe('SellCustomerDetailComponent', () => {
  let component: SellCustomerDetailComponent;
  let fixture: ComponentFixture<SellCustomerDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellCustomerDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellCustomerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
