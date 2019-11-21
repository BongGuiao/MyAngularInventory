import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './../../material-module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UnitTableService } from 'src/app/shared/unittable.service';
import { UnittableRoutingModule } from './unittable-routing.module';
import { UnitTableitemComponent } from './unittableitem/unittableitem.component';
import { UnittableComponent } from './unittable.component';



@NgModule({
  declarations: [UnittableComponent, UnitTableitemComponent],
  imports: [
    CommonModule,
    UnittableRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule
  ],
  entryComponents: [UnitTableitemComponent],
  providers: [UnitTableService]
})

export class UnittableModule { }
