import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes : Routes = [
  // {
  //   path: '',
  //   component: MeterialReportComponent,

  // },
  // {
  //   path: 'customer-acquisition-add-edit/:materialReceiptId',
  //   component: MeterialReportDetailsComponent,
  // },
]



@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
