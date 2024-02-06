import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadashboardComponent } from './cadashboard/cadashboard.component';
import { CustomerAcquisitionAddEditComponent } from './customer-acquisition-add-edit/customer-acquisition-add-edit.component';

const routes: Routes = [
  {
    path: '',
    component: CadashboardComponent
  },
  {
    path: 'customer-acquisition-add-edit/:id',
    component: CustomerAcquisitionAddEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerAcquisitionRoutingModule { }
