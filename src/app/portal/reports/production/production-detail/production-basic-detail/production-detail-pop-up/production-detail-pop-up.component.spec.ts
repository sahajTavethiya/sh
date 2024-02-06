import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionDetailPopUpComponent } from './production-detail-pop-up.component';

describe('ProductionDetailPopUpComponent', () => {
  let component: ProductionDetailPopUpComponent;
  let fixture: ComponentFixture<ProductionDetailPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductionDetailPopUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionDetailPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
