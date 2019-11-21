import { Component, OnInit, ViewChild, AfterViewInit, AfterViewChecked, ElementRef} from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { async } from 'q';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
declare var paypal;
@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.scss']
})
export class PaypalComponent implements AfterViewChecked {
  title = 'paypal-testing';

  addScript = false;
  paypalLoad = false;

  finalAmount = 0.1;

  paypalConfig = {
    env: 'sandbox',
    client: {
      sandbox:
        'AUzr6E2hlouKk7Qe6u3DxanbkkKamrtGZhv3NQtskvrQbPvHP73IZypADc8eg38T4VapIWhrdRs1rVcE',
      production: '<your-production-key here>'
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            { amount: { total: this.finalAmount, currency: 'USD' } }
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then(payment => {
        // Do something when payment is successful
      });
    }
  };

  ngAfterViewChecked(): void {
    if (!this.addScript) {
      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
        this.paypalLoad = true;
      });
    }
  }

  addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      const scriptTagElement = document.createElement('script'); // <script src=""></script>
      scriptTagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scriptTagElement.onload = resolve;
      document.body.appendChild(scriptTagElement);
    });
  }
}

