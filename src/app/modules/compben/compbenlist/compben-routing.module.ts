import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompbenlistComponent } from './compbenlist.component';


const routes: Routes = [
  {
    path: '',
    component: CompbenlistComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompbenRoutingModule { }
