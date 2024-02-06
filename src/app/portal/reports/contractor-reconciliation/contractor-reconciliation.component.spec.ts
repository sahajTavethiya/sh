import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorReconciliationComponent } from './contractor-reconciliation.component';

describe('ContractorReconciliationComponent', () => {
  let component: ContractorReconciliationComponent;
  let fixture: ComponentFixture<ContractorReconciliationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractorReconciliationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorReconciliationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
