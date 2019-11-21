import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PoreceivingComponent } from './poreceiving.component';


const routes: Routes = [{
  path: '',
  component: PoreceivingComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PoreceivingRoutingModule { }
