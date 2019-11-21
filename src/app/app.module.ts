import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../app/material-module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SidenavModule } from './modules/sidenav/sidenav.module';

@NgModule({
  declarations: [
    AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SidenavModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
