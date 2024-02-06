import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DPRNGConversionComponent } from './dpr-ng-conversion.component';

describe('DPRNGConversionComponent', () => {
  let component: DPRNGConversionComponent;
  let fixture: ComponentFixture<DPRNGConversionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DPRNGConversionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DPRNGConversionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
