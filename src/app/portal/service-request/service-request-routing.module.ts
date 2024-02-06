import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestComponent } from './request/request.component';
import { SRDashboardComponent } from './srdashboard/srdashboard.component';

const routes: Routes = [
  {
    path: '',
    component: SRDashboardComponent
  },
  {
    path: 'request/:id',
    component: RequestComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceRequestRoutingModule { }
