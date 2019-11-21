import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ItemFileService } from 'src/app/shared/itemfile.service';
import { ItemdetailComponent } from '../itemdetail/itemdetail.component';
import { Itemfile } from 'src/app/shared/itemfile.model';
@Component({
  selector: 'app-itemfiles',
  templateUrl: './itemlist.component.html',
  styleUrls: ['./itemlist.component.scss']
})
export class ItemlistComponent implements OnInit, AfterViewInit {
  param: string;
  constructor(private http: HttpClient, private service: ItemFileService,
              private dialog: MatDialog, private route: ActivatedRoute) {
                this.route.queryParams.subscribe(params => {
                  this.param = params.id ;
              });
              }
   item: Itemfile;
   items: Itemfile[] = [];

   listData: MatTableDataSource<Itemfile>;
   displayedColumns: string[] = ['id', 'description', 'itemCode', 'classCode', 'createdBy', 'updatedBy', 'actions'];
   @ViewChild(MatSort, null) sort: MatSort;
   @ViewChild(MatPaginator, null) paginator: MatPaginator;
   searchKey: string;

   ngOnInit() {
    this.getItemfiles();
  }
  ngAfterViewInit() {
    // this.listData.sort = this.sort;
    // this.listData.paginator = this.paginator;
  }

  getItemfiles() {
    this.service.getItems(this.param).subscribe(response => { this.service.items = response;
                                                              this.items = response;
                                                              this.listData = new MatTableDataSource(response);
                                                              this.listData.sort = this.sort;
                                                              this.listData.paginator = this.paginator;
    }
      , error => {console.log(error); } );
   }
   onCreate() {
    this.service.initializeFormItem();
    const dialogConfig = new MatDialogConfig();
    const idx = null;
    const dataRow = this.service.form.value;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '70%';
    dialogConfig.data = {idx, dataRow};
    this.dialog.open(ItemdetailComponent, dialogConfig).afterClosed().subscribe(result => {
    this.refreshTable(); });
  }

   onEdit(dataRow) {
     this.service.populateForm(dataRow);
     const idx = '1';
     const dialogConfig = new MatDialogConfig();
     dialogConfig.autoFocus = true;
     dialogConfig.disableClose = true ;
     dialogConfig.width = '70%';
     dialogConfig.data = {idx, dataRow};
     this.dialog.open(ItemdetailComponent, dialogConfig).afterClosed().subscribe(result => {
      this.refreshTable(); });
   }


   onDelete(dataRow) {
     this.service.deleteItems(dataRow.id).subscribe(response => { this.getItemfiles(); } );
  }
  onFormulation(dataRow) {
    alert('Module not yet installed');
  }
   initializeGroup() {
     this.item = {
        id: 0,
        itemCode: '',
        description: '',
        posDescription: '',
        itemGroupId: '0',
        majorGroupId: '0',
        overGroupId: '0',
        classCode: this.param,
        receivingUnitId: '',
        receivingQtyValue: '1',
        issuingUnitId: '',
        issuingQtyValue: '1',
        departmentId: '0',
        parStock: '',
        reorder: '',
        lastCost: '',
        retailPrice: '',
        wholeSalePrice: '',
        lastMovement: '',
        vatable: '',
        markUp: '',
        createdBy: 'System',
        dateCreated: '09/04/2019',
        updatedBy: 'System',
        dateUpdated: '09/04/2019',
        deleted: 0
    };
   }

   onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }
  refreshTable() {
    this.getItemfiles();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }
}
