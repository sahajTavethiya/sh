import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZohoIntegrationComponent } from './zoho-integration.component';

describe('ZohoIntegrationComponent', () => {
  let component: ZohoIntegrationComponent;
  let fixture: ComponentFixture<ZohoIntegrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZohoIntegrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZohoIntegrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
