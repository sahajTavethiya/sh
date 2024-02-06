import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDPRDocumentComponent } from './view-dpr-document.component';

describe('ViewDPRDocumentComponent', () => {
  let component: ViewDPRDocumentComponent;
  let fixture: ComponentFixture<ViewDPRDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDPRDocumentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDPRDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
