import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  {
    path: 'welcome',
    loadChildren: './modules/welcome/welcome.module#WelcomeModule'
  },
  {
    path: 'groupings01',
    loadChildren: './groupings/groupings/groupings.module#GroupingsModule'
  },
  {
    path: 'groupings02',
    loadChildren: './groupings/groupings/groupings.module#GroupingsModule'
  },
  {
    path: 'groupings03',
    loadChildren: './groupings/groupings/groupings.module#GroupingsModule'
  },
  {
    path: 'department',
    loadChildren: './modules/department/department/department.module#DepartmentModule'
  },
  {
    path: 'purchaseorderrm',
    loadChildren: './modules/receiving/receiving.module#ReceivingModule'
  },
  {
    path: 'purchaseorderfg',
    loadChildren: './modules/receiving/receiving.module#ReceivingModule'
  },
  {
    path: 'poreceiving',
    loadChildren: './modules/poreceiving/poreceiving.module#PoreceivingModule'
  },
  {
    path: 'unit',
    loadChildren: './modules/unittable/unittable.module#UnittableModule'
  },
  {
    path: 'itemfile',
    loadChildren: './modules/itemfile/itemfile.module#ItemfileModule'
  },
  {
    path: 'employee',
    loadChildren: './modules/employee/employeelist/employee.module#EmployeeModule'
  },
  {
    path: 'payment',
    loadChildren: './modules/payment/paypal/paypal.module#PaypalModule'
  },
  {
    path: 'supplier',
    loadChildren: './modules/client/client.module#ClientModule'
  },
  {
    path: 'customer',
    loadChildren: './modules/client/client.module#ClientModule'
  },
  {
    path: 'formulation',
    loadChildren: './modules/itemfile/formulation/formulation.module#FormulationModule'
  },
  {
    path: '',
    redirectTo: '/welcome',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
