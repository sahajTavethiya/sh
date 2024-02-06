import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicDetailOfOrderComponent } from './basic-detail-of-order.component';

describe('BasicDetailOfOrderComponent', () => {
  let component: BasicDetailOfOrderComponent;
  let fixture: ComponentFixture<BasicDetailOfOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicDetailOfOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicDetailOfOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
