import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsRoutingModule } from './reports-routing.module';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import { MultiSelectModule } from 'primeng/multiselect';
import { ZohoIntegrationComponent } from './zoho-integration/zoho-integration.component';
import { AssignTaskDetailComponent } from './assign-task/assign-task-detail/assign-task-detail.component';
import { AssignTaskDetailPageComponent } from './assign-task/assign-task-detail/assign-task-detail-page/assign-task-detail-page.component';
import { AssignTaskDetailDialogComponent } from './assign-task/assign-task-detail/assign-task-detail-page/assign-task-detail-dialog/assign-task-detail-dialog.component';
@NgModule({
  declarations: [
    ZohoIntegrationComponent,
    AssignTaskDetailComponent,
    AssignTaskDetailPageComponent,
    AssignTaskDetailDialogComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    TableModule,
    PaginatorModule,
    ButtonModule,
    MatIconModule,
    MatChipsModule,
    DialogModule,
    FormsModule, 
    ReactiveFormsModule,
    MatTabsModule,
    MatCardModule,
    MultiSelectModule,
    
  ]
})
export class ReportsModule { }
