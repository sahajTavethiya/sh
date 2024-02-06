import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicDetailOfClientComponent } from './basic-detail-of-client.component';

describe('BasicDetailOfClientComponent', () => {
  let component: BasicDetailOfClientComponent;
  let fixture: ComponentFixture<BasicDetailOfClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicDetailOfClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicDetailOfClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
