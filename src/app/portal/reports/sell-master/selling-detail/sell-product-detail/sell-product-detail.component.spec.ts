import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellProductDetailComponent } from './sell-product-detail.component';

describe('SellProductDetailComponent', () => {
  let component: SellProductDetailComponent;
  let fixture: ComponentFixture<SellProductDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellProductDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
