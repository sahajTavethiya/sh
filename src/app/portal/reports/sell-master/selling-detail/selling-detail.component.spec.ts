import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellingDetailComponent } from './selling-detail.component';

describe('SellingDetailComponent', () => {
  let component: SellingDetailComponent;
  let fixture: ComponentFixture<SellingDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellingDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
