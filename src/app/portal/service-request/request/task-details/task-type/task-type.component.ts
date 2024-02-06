import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { EnquiryTaskLine } from 'src/app/library/core/models/service-request/enquiry-task-line.model';
import { TaskDetailsService } from '../task-details.service';

@Component({
  selector: 'app-task-type',
  templateUrl: './task-type.component.html',
  styleUrls: ['./task-type.component.scss']
})
export class TaskTypeComponent implements OnInit {
  taskTypeForm: FormGroup;

  serviceCategories: Array<any>;
  serviceSubCategories: Array<any>;
  filteredSubCategories: Array<any>;

  constructor(readonly formBuilder: RxFormBuilder,
    readonly service: TaskDetailsService,
    @Inject(MAT_DIALOG_DATA) public data: { serviceId: number },
    public dialogRef: MatDialogRef<TaskTypeComponent>) { }

  ngOnInit(): void {
    this.bindDropdowns();
    this.initialize();
  }

  bindDropdowns() {
    const categories: string[] = [
      this.service.constants.MasterCategories.Category,
      this.service.constants.MasterCategories.SubCategory,
    ];

    this.service.getLookups(categories, (lookups: any) => {
      this.serviceCategories = lookups[this.service.constants.MasterCategories.Category];
      this.serviceSubCategories = lookups[this.service.constants.MasterCategories.SubCategory];
    }, this.data.serviceId);
  }

  initialize() {
    const enquiryTaskLine = new EnquiryTaskLine();
    this.taskTypeForm = this.formBuilder.formGroup(enquiryTaskLine);
    this.detectValueChanges();
  }

  detectValueChanges() {
    this.taskTypeForm.controls.categoryId.valueChanges.subscribe((category: any) => {
      if (category) {
        this.taskTypeForm.get('subCategoryId')?.setValue(null);
        this.filteredSubCategories = this.serviceSubCategories.filter(subCategory => {
          return subCategory.parent === category.keyName;
        });
      } else {
        this.taskTypeForm.get('subCategoryId')?.setValue(null);
        this.filteredSubCategories = new Array<any>();
      }
    });

  }

  addTaskType() {
    if (this.taskTypeForm.valid) {
      const taskType = this.taskTypeForm.getRawValue();
      taskType.category = taskType.categoryId.displayText;
      taskType.subCategory = taskType.subCategoryId.displayText;
      taskType.categoryId = taskType.categoryId.keyName;
      taskType.subCategoryId = taskType.subCategoryId.keyName;

      this.dialogRef.close(taskType);
    } else {
      this.taskTypeForm.markAllAsTouched();
      this.service.notify.showDefaultError();
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
