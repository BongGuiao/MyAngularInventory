import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/material-module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ItemfileRoutingModule } from './itemfile-routing.module';
import { ItemdetailComponent } from './itemdetail/itemdetail.component';
import { ItemFileService } from '../../shared/itemfile.service';
import { ItemlistComponent} from './itemlist/itemlist.component';

@NgModule({
  declarations: [ItemlistComponent, ItemdetailComponent],
  imports: [
    CommonModule,
    ItemfileRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule
  ],
  entryComponents: [ItemdetailComponent],
  providers: [ItemFileService]
})
export class ItemfileModule { }
