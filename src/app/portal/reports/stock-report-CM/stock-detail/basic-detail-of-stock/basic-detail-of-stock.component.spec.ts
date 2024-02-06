import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicDetailOfStockComponent } from './basic-detail-of-stock.component';

describe('BasicDetailOfStockComponent', () => {
  let component: BasicDetailOfStockComponent;
  let fixture: ComponentFixture<BasicDetailOfStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicDetailOfStockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicDetailOfStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
