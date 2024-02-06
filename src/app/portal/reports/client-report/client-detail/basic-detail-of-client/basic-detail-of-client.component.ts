import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-basic-detail-of-client',
  templateUrl: './basic-detail-of-client.component.html',
  styleUrls: ['./basic-detail-of-client.component.scss']
})
export class BasicDetailOfClientComponent implements OnInit {
  @Input() requestForm: FormGroup;
  @Input() lookups : any;
  constructor() { }

  ngOnInit(): void {
    this.bindDropdowns();
  }

  bindDropdowns() {
  }
  public get RequestDetail() {
    return this.requestForm as FormGroup;
  }
}
