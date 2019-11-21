import { ClientService } from './../../shared/client.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientlistComponent } from './clientlist/clientlist.component';
import { ClientdetailComponent } from './clientdetail/clientdetail.component';
import { MaterialModule } from 'src/app/material-module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [ClientdetailComponent, ClientlistComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule
  ],
  entryComponents: [ClientdetailComponent],
  providers: [ClientService]
})
export class ClientModule { }
