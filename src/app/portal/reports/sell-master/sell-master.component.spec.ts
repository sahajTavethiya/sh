import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellMasterComponent } from './sell-master.component';

describe('SellMasterComponent', () => {
  let component: SellMasterComponent;
  let fixture: ComponentFixture<SellMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
