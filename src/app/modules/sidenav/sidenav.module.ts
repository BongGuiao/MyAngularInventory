import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav.component';
import { MaterialModule } from '../../../app/material-module';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ConfirmdialogComponent } from '../confirmdialog/confirmdialog.component';
import { DialogService } from 'src/app/shared/dialog.service';
@NgModule({
  declarations: [ConfirmdialogComponent, SidenavComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule
  ],
  exports: [SidenavComponent],
  entryComponents: [ConfirmdialogComponent],
  providers: [DialogService]
})
export class SidenavModule { }
