import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { PoHeadService } from 'src/app/shared/pohead.service';
import { ClientService } from 'src/app/shared/client.service';
import { DialogService } from './../../shared/dialog.service';
import { PurchaseOrder } from 'src/app/shared/purchaseorder.model';
import { Client } from './../../shared/client.model';
import { PoHead } from './../../shared/pohead.model';
import { PoDetailReceipt } from './../../shared/podetailreceipt.model';
import { ReceivingdetailComponent } from './receivingdetail/receivingdetail.component';
import { IngredientsComponent } from './../formulation/ingredients/ingredients.component';

@Component({
  selector: 'app-receiving',
  templateUrl: './receiving.component.html',
  styleUrls: ['./receiving.component.scss']
})
export class ReceivingComponent implements OnInit {
  param: string;
  maxPoDate = new Date();
  constructor( private service: PoHeadService,
               private snackBar: MatSnackBar,
               private clientService: ClientService,
               private dialogService: DialogService,
               private dialog: MatDialog, private route: ActivatedRoute) {
                this.route.queryParams.subscribe(params => {
                  this.param = params.id ;
              });
              }
   poHead: PoHead;
   poReceipts: PoDetailReceipt[] = [];
   clients: Client[];
   orders: PurchaseOrder;
   isLoaded =  false;
   poId: number;
   poAmount: number;
   public poItemHead: PoHead;
   itemFile = this.service.form;
   listData: MatTableDataSource<PoDetailReceipt>;
   displayedColumns: string[] = ['id', 'itemId', 'description', 'poQty', 'unit', 'unitCost', 'amount', 'actions'];
   @ViewChild(MatSort, null) sort: MatSort;
   @ViewChild(MatPaginator, null) paginator: MatPaginator;
   searchKey: string;

   ngOnInit() {
    this.poId = 0 ;
    this.getClients();
    this.isLoaded = !this.isLoaded ;
    this.service.itemClass = this.param;
  }

  getPoHead() {
      this.service.getItem(this.poId).subscribe(response => { this.service.orders = response;
                                                              this.poReceipts = response.poReceipt;
                                                              this.listData = new MatTableDataSource(response.poReceipt);
                                                              this.listData.sort = this.sort;
                                                              this.listData.paginator = this.paginator;
                                                              this.poHead = response.poHead;
                                                              this.calculatePoAmount();
                                                              this.itemFile.patchValue(response.poHead);
      }
        , error => {  this.service.initializeFormItem(); this.itemFile.patchValue(this.poHead);
                      this.listData = new MatTableDataSource(this.poReceipts);
                 } );
   }
   onCreate() {
    this.poHead = this.service.form.value;
    if (!this.poHead.isOpen && this.poId > 0) {
      this.onShowSnackBarMessage('Ooops!', 'CANNOT ADD ITEM, ORDER HAS ALREADY BEEN CLOSED..!');
      return ;
    }
    if (!this.service.ofValidateHeader()) {
      this.snackBar.open('Ooops!',
      'ORDER INFORMATION must be filled up first..',
        {duration: 5000});
      this.poId = 0;
      this.refreshTable();
      return ;
    }
    if (this.poHead.id === 0) {
      this.poHead.meridian = '';
      this.poHead.createdBy = 'System';
      this.poHead.updatedBy = 'System';
      this.service.addPoHead(this.poHead).subscribe(response => { this.poHead.id = response.id;
                                                                  this.service.form.controls.id.setValue(response.id);
                                                                  this.poId = response.id; });
    }
    this.service.initializeFormDetailItem();
    const dialogConfig = new MatDialogConfig();
    const idx = null;
    const poId = this.poHead;
    const dataRow = this.service.formDetail.value;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.data = {idx, dataRow, poId};
    this.dialog.open(ReceivingdetailComponent, dialogConfig).afterClosed().subscribe(result => {
    this.refreshTable(); });
  }

   onEdit(dataRow) {
     this.poHead = this.service.form.value;
     if (!this.poHead.isOpen) {
      this.onShowSnackBarMessage('Ooops!', 'EDIT IS NOT ALLOWED, ORDER HAS ALREADY BEEN CLOSED..!');
      return ;
    }
     const idx = '1';
     const dialogConfig = new MatDialogConfig();
     dialogConfig.autoFocus = true;
     dialogConfig.disableClose = true ;
     dialogConfig.width = '50%';
     const poId = this.poHead;
     dialogConfig.data = {idx, dataRow, poId};
     this.dialog.open(ReceivingdetailComponent, dialogConfig).afterClosed().subscribe(result => { this.refreshTable(); });
   }
   onDelete(dataRow) {
    if (!this.poHead.isOpen) {
      this.onShowSnackBarMessage('Ooops!', 'DELETE IS NOT ALLOWED, ORDER HAS ALREADY BEEN CLOSED..!');
      return ;
    }
    this.dialogService.openConfirmDialog('Are you sure to delete this record ?')
    .afterClosed().subscribe(res => { if (res) {
      this.service.deleteItemDetail(dataRow.id).subscribe(response => { this.refreshTable(); } );
    }} );
    }
  onFinalize() {
    this.poHead = this.service.form.value;
    if (!this.poHead.isOpen) {
      this.onShowSnackBarMessage('Ooops!', 'ORDER HAS ALREADY BEEN CLOSED..');
      return ;
    }
    if (this.ofValidatePo()) {
      this.ofUpdateHeader('Order Finalized!');
    } else {
      this.onShowSnackBarMessage('Ooops!', 'Place your next order first.');
      this.poId = 0; this.refreshTable();
    }
  }
  ofClosePo() {
    if (!this.poHead.isOpen) {
      this.onShowSnackBarMessage('Ooops!', 'ORDER HAS ALREADY BEEN CLOSED..');
      return ;
    }
    if (this.ofValidatePo()) {
      this.poHead.isOpen =  false;
      this.ofUpdateHeader('Purchase Order Closed!');
    }
  }
  ofGenerateRequiredMaterials(dataRow) {
    const idx = '1';
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true ;
    dialogConfig.width = '50%';
    dialogConfig.height = '50%';
    const poId = this.poHead;
    dialogConfig.data = {idx, dataRow, poId};
    this.dialog.open(IngredientsComponent, dialogConfig).afterClosed().subscribe(result => { this.refreshTable(); });

  }
  ofValidatePo(): boolean {
    if (this.poHead.id === 0) {
      return false;
    } else {return true ; }
  }

  ofUpdateHeader(message: string) {
    this.service.updatePoHead(this.poHead, this.poId).subscribe(response => {
      this.onShowSnackBarMessage(message, 'Start your next order..');
      this.poId = 0; this.refreshTable();
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
    if (this.poHead.supplierId === 0 ) {
      this.snackBar.open('Error!', 'Supplier pending order module not yet installed.', {duration: 3000});
    }

  }
  onSupplierPurchasedHistory() {
    if (this.poHead.supplierId === 0 ) {
    this.snackBar.open('Error!', 'Supplier purchased history module not yet installed.', {duration: 3000});
    }
  }

  onChangeId(newValue: number) {
      this.poId = newValue;
      this.getPoHead();
  }
   onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }
  refreshTable() {
    this.getPoHead();
  }
  calculatePoAmount() {
    this.poAmount = 0 ;
    this.poReceipts.forEach(element => {
      this.poAmount += element.amount;
    });
    this.poHead.poAmount = this.poAmount;
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }
  onSubmit() {
    this.poItemHead = this.itemFile.value;
  }
}
