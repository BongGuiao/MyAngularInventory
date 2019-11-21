import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { ReceivingService } from 'src/app/shared/receiving.service';
import { PoHeadService } from 'src/app/shared/pohead.service';
import { ClientService } from 'src/app/shared/client.service';
import { DialogService } from './../../shared/dialog.service';
import { ReceivingOrder } from 'src/app/shared/receivingorder.model';
import { Client } from './../../shared/client.model';
import { RrHead } from './../../shared/rrhead.model';
import { PoHead } from './../../shared/pohead.model';
import { RrDetailReceipt } from './../../shared/rrdetailreceipt.model';
import { PoreceivingdetailComponent } from './poreceivingdetail/poreceivingdetail.component';

@Component({
  selector: 'app-poreceiving',
  templateUrl: './poreceiving.component.html',
  styleUrls: ['./poreceiving.component.scss']
})
export class PoreceivingComponent implements OnInit {
  param: string;
  maxRrDate = new Date();
  constructor( private service: ReceivingService,
               private snackBar: MatSnackBar,
               private clientService: ClientService,
               private poService: PoHeadService,
               private dialogService: DialogService,
               private dialog: MatDialog, private route: ActivatedRoute) {
                this.route.queryParams.subscribe(params => {
                  this.param = params.id ;
              });
              }
   rrHead: RrHead;
   poHead: PoHead;
   rrReceipts: RrDetailReceipt[] = [];
   clients: Client[];
   orders: ReceivingOrder;
   isLoaded =  false;
   rrId: number;
   rrAmount: number;
   baseAmount: number;
   vatAmount: number;
   public rrItemHead: RrHead;
   itemFile = this.service.form;
   listData: MatTableDataSource<RrDetailReceipt>;
   displayedColumns: string[] = ['id', 'itemId', 'description', 'rrQty', 'unit', 'unitCost', 'baseCost', 'amount', 'actions'];
   @ViewChild(MatSort, null) sort: MatSort;
   @ViewChild(MatPaginator, null) paginator: MatPaginator;
   searchKey: string;

  ngOnInit() {
      this.service.initializeFormItem();
      this.rrId = 0 ;
      this.getClients();
      this.isLoaded = !this.isLoaded ;
  }

  getRrHead() {
      this.service.getItems(this.rrId).subscribe(response => {  this.service.orders = response;
                                                                this.rrReceipts = response.rrReceipt;
                                                                this.listData = new MatTableDataSource(response.rrReceipt);
                                                                this.listData.sort = this.sort;
                                                                this.listData.paginator = this.paginator;
                                                                this.rrHead = response.rrHead;
                                                                this.calculateRrAmount();
                                                                this.itemFile.patchValue(this.rrHead);
      }
        , error => {  this.service.initializeFormItem(); this.itemFile.patchValue(this.rrHead);
                      this.listData = new MatTableDataSource(this.rrReceipts);
                 } );
   }
   onCreate() {
    this.rrHead = this.service.form.value;
    if (!this.rrHead.isKept) {
      this.onShowSnackBarMessage('Ooops!', 'CANNOT ADD ITEM, ORDER RECEIVING HAS ALREADY BEEN CLOSED..!');
      return ;
    }
    if (!this.service.ofValidateHeader()) {
      this.snackBar.open('Ooops!',
      'RECEIVING INFORMATION must be filled up first..',
        {duration: 5000});
      return ;
    }
    this.service.initializeFormDetailItem();
    const dialogConfig = new MatDialogConfig();
    const idx = null;
    const rrId = this.rrHead;
    const dataRow = this.service.formDetail.value;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.data = {idx, dataRow, rrId};
    this.dialog.open(PoreceivingdetailComponent, dialogConfig).afterClosed().subscribe(result => {
      this.service.updateRrHead(this.rrHead, this.rrId).subscribe( res => { this.refreshTable(); }); });
  }

  onEdit(dataRow) {
      if (!this.service.ofValidateHeader()) {
        this.snackBar.open('Ooops!',
        'RECEIVING INFORMATION must be filled up first..',
          {duration: 5000});
        return ;
      }
      this.rrHead = this.service.form.value;
      if (!this.rrHead.isKept) {
      this.onShowSnackBarMessage('Ooops!', 'EDIT IS NOT ALLOWED, RECEIVING ORDER HAS ALREADY BEEN CLOSED..!');
      return ;
    }
      const idx = '1';
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.disableClose = true ;
      dialogConfig.width = '50%';
      const poId = this.rrHead;
      dialogConfig.data = {idx, dataRow, poId};
      this.rrId = this.rrHead.id;
      this.dialog.open(PoreceivingdetailComponent, dialogConfig).afterClosed().subscribe(result => {
      this.service.updateRrHead(this.rrHead, this.rrId).subscribe( res => {this.refreshTable()});
     });
   }

   onDelete(dataRow) {
    if (!this.rrHead.isKept) {
      this.onShowSnackBarMessage('Ooops!', 'DELETE IS NOT ALLOWED, RECEIVING ORDER HAS ALREADY BEEN CLOSED..!');
      return ;
    }
    this.dialogService.openConfirmDialog('Are you sure to delete this record ?')
    .afterClosed().subscribe(res => { if (res) {
      this.service.deleteItemDetail(dataRow.id).subscribe(response => { this.refreshTable(); } );
    }} );
  }
  onFinalize() {
    this.rrHead = this.service.form.value;
    if (!this.rrHead.isKept) {
      this.onShowSnackBarMessage('Ooops!', 'RECEIVING ORDER HAS ALREADY BEEN CLOSED..');
      return ;
    }
    if (this.ofValidateRr()) {
      this.ofUpdateHeader('Receving Order Finalized!');
      this.rrId = 0; this.refreshTable();
    } else {
      this.onShowSnackBarMessage('Ooops!', 'Place your next receiving order first.');
    }
  }
  ofClosePo() {
    if (!this.rrHead.isKept) {
      this.onShowSnackBarMessage('Ooops!', 'RECEIVING ORDER HAS ALREADY BEEN CLOSED..');
      return ;
    }
    if (this.ofValidateRr()) {
      this.rrHead.isKept =  false;
      this.ofUpdateHeader('Receiving Order Closed!');
    }
  }
  ofValidateRr(): boolean {
    if (this.rrHead.id === 0) {
      return false;
    } else {return true ; }
  }

  ofUpdateHeader(message: string) {
    this.service.updateRrHead(this.rrHead, this.rrId).subscribe(response => {
      this.onShowSnackBarMessage(message, 'Start your next receiving order..');
      this.rrId = 0; this.refreshTable();
    });
  }
  onShowSnackBarMessage(message: string, action: string) {
    this.snackBar.open( message , action, {duration: 4000});
  }
  getClients() {
    this.clientService.getClient('SU').subscribe(response => { this.clients = response; } );
  }
  onPrintOrder( ) {
    this.snackBar.open('Error!', 'Print module not yet installed.', {duration: 5000});
  }
  onSupplierPendingOrders() {
    if (this.rrHead.supplierId === 0 ) {
      this.snackBar.open('Error!', 'Supplier pending order module not yet installed.', {duration: 3000});
    }

  }
  onSupplierPurchasedHistory() {
    if (this.rrHead.supplierId === 0 ) {
    this.snackBar.open('Error!', 'Supplier purchased history module not yet installed.', {duration: 3000});
    }
  }

   onChangeId(newValue: number) {
      this.rrId = newValue;
      this.getRrHead();
  }
  onChangePoHeadId(newValue: number) {
    if (this.rrId === 0) {
      this.poService.getPoHead(newValue)
      .subscribe( response => { if (response.id > 0) {
        this.dialogService.openConfirmDialog('Are you sure to receive item(s) from this P.O ?' + newValue)
        .afterClosed().subscribe(res => {
          if (res) {
            this.service.getItem(newValue).subscribe(resp => {
            if (resp.rrDetail) {
              this.rrHead = resp.rrHead;
              this.rrId = this.rrHead.id;
              this.getRrHead();
              this.updateOrderDelivery();
            } else {
                this.snackBar.open('Error!', 'Invalid Po Number.' + newValue, {duration: 3000});
              }
            }
            , error => {  this.service.initializeFormItem();
                          this.itemFile.patchValue(this.rrHead); });
          } // end (res)
        }); // end subscribe dialog
      }});
    }
 }

   onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }
  refreshTable() {
    this.getRrHead();
  }
  calculateRrAmount() {
    this.rrAmount = 0 ;
    this.baseAmount = 0 ;
    this.vatAmount = 0 ;
    this.rrReceipts.forEach(element => {
      this.rrAmount += element.unitCost * element.rrQty;
      this.baseAmount += element.baseCost * element.rrQty;
      this.vatAmount += element.vatAmount * element.rrQty;
    });
    this.rrHead.netAmount = parseFloat(this.rrAmount.toFixed(3));
    this.rrHead.baseAmount = parseFloat(this.baseAmount.toFixed(3));
    this.rrHead.vatAmount = parseFloat(this.vatAmount.toFixed(3));
  }

  updateOrderDelivery() {
    this.rrReceipts.forEach(element => {
      console.log('updateOrderDelivery');
    });
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }
  onSubmit() {
    this.rrItemHead = this.itemFile.value;
  }
}
