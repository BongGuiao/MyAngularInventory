import { Department } from './../../../shared/department.model';
import { Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { DepartmentService } from 'src/app/shared/department.service';
import { DepartmentitemComponent } from '../departmentitem/departmentitem.component';
@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit, AfterViewInit {

  param: string;
  constructor(private http: HttpClient, private service: DepartmentService,
              private dialog: MatDialog, private route: ActivatedRoute) {
                this.route.queryParams.subscribe(params => {
                  this.param = params.id ;
              });
              }
   department: Department;
   departments: Department[] = [];

   listData: MatTableDataSource<Department>;
   displayedColumns: string[] = ['id', 'description', 'createdBy', 'updatedBy', 'actions'];
   @ViewChild(MatSort, null) sort: MatSort;
   @ViewChild(MatPaginator, null) paginator: MatPaginator;
   searchKey: string;

   ngOnInit() {
    this.getDepartments();
    console.log(this.param);
  }
  ngAfterViewInit() {
    // this.listData.sort = this.sort;
    // this.listData.paginator = this.paginator;
  }

  getDepartments() {
    this.service.getDepartment(this.param).subscribe(response => {  this.service.departments = response;
                                                                    this.departments = response;
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
    this.dialog.open(DepartmentitemComponent, dialogConfig).afterClosed().subscribe(result => {
    this.getDepartments(); });
  }

   onEdit(dataRow) {
     this.service.populateForm(dataRow);
     const idx = '1';
     const dialogConfig = new MatDialogConfig();
     dialogConfig.autoFocus = true;
     dialogConfig.disableClose = true ;
     dialogConfig.width = '50%';
     dialogConfig.data = {idx, dataRow};
     this.dialog.open(DepartmentitemComponent, dialogConfig);
   }


   onDelete(dataRow) {
     this.service.deleteDepartment(dataRow.id).subscribe(response => { this.getDepartments(); } );
  }
   initializeGroup() {
     this.department = {
        id: 0,
        description: '',
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
    this.getDepartments();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

}
