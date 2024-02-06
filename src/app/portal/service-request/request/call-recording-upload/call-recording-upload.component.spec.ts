import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallRecordingUploadComponent } from './call-recording-upload.component';

describe('CallRecordingUploadComponent', () => {
  let component: CallRecordingUploadComponent;
  let fixture: ComponentFixture<CallRecordingUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallRecordingUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CallRecordingUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
