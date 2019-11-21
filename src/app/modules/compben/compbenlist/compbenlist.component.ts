import { Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CompbenTableService } from 'src/app/shared/compben.service';
import { CompbenTable } from './../../../shared/compben.model';
import { CompbendetailComponent } from './../compbendetail/compbendetail.component';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-compbenlist',
  templateUrl: './compbenlist.component.html',
  styleUrls: ['./compbenlist.component.scss']
})
export class CompbenlistComponent implements OnInit , AfterViewInit {

  param: string;
  constructor(private http: HttpClient, private service: CompbenTableService,
              private dialog: MatDialog, private route: ActivatedRoute) {
                this.route.queryParams.subscribe(params => {
                  this.param = params.id ;
              });
              }
   compbenTable: CompbenTable;
   compbenTables: CompbenTable[] = [];

   listData: MatTableDataSource<CompbenTable>;
   displayedColumns: string[] = ['id', 'description', 'taxable', 'createdBy', 'updatedBy', 'actions'];
   @ViewChild(MatSort, null) sort: MatSort;
   @ViewChild(MatPaginator, null) paginator: MatPaginator;
   searchKey: string;

   ngOnInit() {
    this.getCompbenTables();
  }
  ngAfterViewInit() {
    // this.listData.sort = this.sort;
    // this.listData.paginator = this.paginator;
  }

  getCompbenTables() {
    this.service.getCompbenTables(this.param).subscribe(response => {  this.service.comps = response;
                                                                       this.compbenTables = response;
                                                                       console.log(response);
                                                                       this.listData = new MatTableDataSource(response);
                                                                       this.listData.sort = this.sort;
                                                                       this.listData.paginator = this.paginator;
    }
      , error => {console.log(error); } );
   }
   onCreate() {
    this.service.initializeFormGroup(this.param);
    const dialogConfig = new MatDialogConfig();
    const idx = null;
    const dataRow = this.service.form.value;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.data = {idx, dataRow};
    this.dialog.open(CompbendetailComponent, dialogConfig).afterClosed().subscribe(result => {
    this.getCompbenTables(); });
  }

   onEdit(dataRow) {
     console.log(dataRow);
     this.service.populateForm(dataRow);
     const idx = '1';
     const dialogConfig = new MatDialogConfig();
     dialogConfig.autoFocus = true;
     dialogConfig.disableClose = true ;
     dialogConfig.width = '50%';
     dialogConfig.data = {idx, dataRow};
     this.dialog.open(CompbendetailComponent, dialogConfig);
   }


   onDelete(dataRow) {
     this.service.deleteCompbenTables(dataRow.id).subscribe(response => { this.getCompbenTables(); } );
  }
   initializeGroup() {
     this.compbenTable = {
        id: 0,
        description: '',
        taxable: true,
        sssIncluded: true,
        piIncluded: true,
        phIncluded: true,
        tMonthIncluded: true,
        createdBy: 'Bong Guiao',
        dateCreated: '09/04/2019',
        updatedBy: 'Bong Guiao',
        dateUpdated: '09/04/2019'
    };
   }

   onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }
  refreshTable() {
    this.getCompbenTables();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

}

