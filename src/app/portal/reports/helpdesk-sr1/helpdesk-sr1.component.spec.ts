import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpdeskSR1Component } from './helpdesk-sr1.component';

describe('HelpdeskSR1Component', () => {
  let component: HelpdeskSR1Component;
  let fixture: ComponentFixture<HelpdeskSR1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpdeskSR1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpdeskSR1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
