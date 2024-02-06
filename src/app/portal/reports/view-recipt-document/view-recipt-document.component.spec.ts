import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReciptDocumentComponent } from './view-recipt-document.component';

describe('ViewReciptDocumentComponent', () => {
  let component: ViewReciptDocumentComponent;
  let fixture: ComponentFixture<ViewReciptDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewReciptDocumentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewReciptDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
