import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SparesConsumablesComponent } from './spares-consumables.component';

describe('SparesConsumableseComponent', () => {
  let component: SparesConsumablesComponent;
  let fixture: ComponentFixture<SparesConsumablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SparesConsumablesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SparesConsumablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
