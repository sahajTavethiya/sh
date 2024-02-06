import { Component, OnInit ,Input} from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { AddCustomerService } from '../add-customer/add-customer.service';
@Component({
  selector: 'app-contractor-employee',
  templateUrl: './contractor-employee.component.html',
  styleUrls: ['./contractor-employee.component.scss']
})
export class ContractorEmployeeComponent implements OnInit {
  @Input() requestForm: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.requestForm = this.formBuilder.group({
      fields: this.formBuilder.array([]) // Initialize an empty array of fields
    });
  }
  public get RequestDetail() {
    return this.requestForm.controls.ContractorEmployee as FormGroup;
  }
  // RequestDetail

  get fieldsControl() {
    return this.requestForm.get('fields') as FormArray;
  }

  // Add a new field to the form
  addField() {
    this.fieldsControl.push(this.createField());
  }

  // Remove a field from the form at the specified index
  removeField(index: number) {
    this.fieldsControl.removeAt(index);
  }

  // Create a new field control
  createField(): FormGroup {
    return this.formBuilder.group({
      Name: [''], // Add other form controls here
      AadhaaNo: [''],
      EmailId: [''],
      Phone: ['']
    });
  }

}