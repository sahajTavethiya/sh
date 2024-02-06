import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssignManpowerBulkComponent } from './assign-manpower-bulk.component';


describe('AssignManpowerBulkComponent', () => {
  let component: AssignManpowerBulkComponent;
  let fixture: ComponentFixture<AssignManpowerBulkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignManpowerBulkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignManpowerBulkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
