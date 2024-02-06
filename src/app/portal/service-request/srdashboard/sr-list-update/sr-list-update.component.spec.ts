import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SrListUpdateComponent } from './sr-list-update.component';

describe('SrListUpdateComponent', () => {
  let component: SrListUpdateComponent;
  let fixture: ComponentFixture<SrListUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SrListUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SrListUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
