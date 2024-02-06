import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionBasicDetailComponent } from './production-basic-detail.component';

describe('ProductionBasicDetailComponent', () => {
  let component: ProductionBasicDetailComponent;
  let fixture: ComponentFixture<ProductionBasicDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductionBasicDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionBasicDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
