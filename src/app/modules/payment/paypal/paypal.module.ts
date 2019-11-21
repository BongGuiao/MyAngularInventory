import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { PaypalRoutingModule } from './paypal-routing.module';
import { PaypalComponent } from './paypal.component';
import { NgxPayPalModule } from 'ngx-paypal';
@NgModule({
  declarations: [PaypalComponent],
  imports: [
    CommonModule,
    FormsModule,
    PaypalRoutingModule,
    NgxPayPalModule
  ]
})
export class PaypalModule { }
