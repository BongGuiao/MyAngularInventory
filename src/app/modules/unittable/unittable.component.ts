
import { Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { UnitTableService } from 'src/app/shared/unittable.service';
import { UnitTable } from './../../shared/unitTable.model';
import { UnitTableitemComponent } from './unittableitem/unittableitem.component';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-unittable',
  templateUrl: './unittable.component.html',
  styleUrls: ['./unittable.component.scss']
})
export class UnittableComponent implements OnInit, AfterViewInit {

  param: string;
  constructor(private http: HttpClient, private service: UnitTableService,
              private dialog: MatDialog, private route: ActivatedRoute) {
                this.route.queryParams.subscribe(params => {
                  this.param = params.id ;
              });
              }
   unitTable: UnitTable;
   unitTables: UnitTable[] = [];

   listData: MatTableDataSource<UnitTable>;
   displayedColumns: string[] = ['id', 'description', 'unitValue', 'createdBy', 'updatedBy', 'actions'];
   @ViewChild(MatSort, null) sort: MatSort;
   @ViewChild(MatPaginator, null) paginator: MatPaginator;
   searchKey: string;

   ngOnInit() {
    this.getUnitTables();
  }
  ngAfterViewInit() {
    // this.listData.sort = this.sort;
    // this.listData.paginator = this.paginator;
  }

  getUnitTables() {
    this.service.getUnitTables(this.param).subscribe(response => {  this.service.units = response;
                                                                    this.unitTables = response;
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
    this.dialog.open(UnitTableitemComponent, dialogConfig).afterClosed().subscribe(result => {
    this.getUnitTables(); });
  }

   onEdit(dataRow) {
     this.service.populateForm(dataRow);
     const idx = '1';
     const dialogConfig = new MatDialogConfig();
     dialogConfig.autoFocus = true;
     dialogConfig.disableClose = true ;
     dialogConfig.width = '50%';
     dialogConfig.data = {idx, dataRow};
     this.dialog.open(UnitTableitemComponent, dialogConfig);
   }


   onDelete(dataRow) {
     this.service.deleteUnitTables(dataRow.id).subscribe(response => { this.getUnitTables(); } );
  }
   initializeGroup() {
     this.unitTable = {
        id: 0,
        description: '',
        unitValue: 1,
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
    this.getUnitTables();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

}
