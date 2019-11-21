import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnittableComponent } from './unittable.component';

const routes: Routes = [
  {
    path: '',
    component: UnittableComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnittableRoutingModule { }
