import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaypalComponent } from './paypal.component';


const routes: Routes = [{
  path: '',
  component: PaypalComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaypalRoutingModule { }
