import { Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'src/app/shared/employee.service';
import { EmployeedetailComponent } from '../employeedetail/employeedetail.component';
import { Employee } from 'src/app/shared/Employee.model';

@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrls: ['./employeelist.component.scss']
})
export class EmployeelistComponent implements OnInit, AfterViewInit {
  param: string;
  constructor(private http: HttpClient, private service: EmployeeService,
              private dialog: MatDialog, private route: ActivatedRoute) {
      this.route.queryParams.subscribe(params => {
        this.param = params.id ;
    });
    }
    employee: Employee;
    employees: Employee[] = [];
    listData: MatTableDataSource<Employee>;
    // tslint:disable-next-line: max-line-length
    displayedColumns: string[] = ['id', 'employeeCode', 'lastName', 'firstName', 'middleName', 'mobileNumber', 'createdBy', 'updatedBy', 'actions'];
    @ViewChild(MatSort, null) sort: MatSort;
    @ViewChild(MatPaginator, null) paginator: MatPaginator;
    searchKey: string;

    ngOnInit() {
     this.getEmployees();
   }
   ngAfterViewInit() {
     // this.listData.sort = this.sort;
     // this.listData.paginator = this.paginator;
   }
   getEmployees() {
     this.service.getEmployee(this.param).subscribe(response => {  this.service.employees = response;
                                                                   this.employees = response;
                                                                   this.listData = new MatTableDataSource(response);
                                                                   this.listData.sort = this.sort;
                                                                   this.listData.paginator = this.paginator; }
       , error => {console.log(error); } );
    }

    onCreate() {
     this.service.initializeFormGroup(this.param);
     const dialogConfig = new MatDialogConfig();
     const idx = null;
     const dataRow = this.service.form.value;
     dialogConfig.disableClose = true;
     dialogConfig.autoFocus = true;
     dialogConfig.width = '75%';
     dialogConfig.height = '98%';
     dialogConfig.data = {idx, dataRow};
     this.dialog.open(EmployeedetailComponent, dialogConfig).afterClosed().subscribe(result => {
     this.getEmployees(); });
   }

    onEdit(dataRow) {
      this.service.populateForm(dataRow);
      const idx = '1';
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.disableClose = true ;
      dialogConfig.width = '75%';
      dialogConfig.height = '98%';
      dialogConfig.data = {idx, dataRow};
      this.dialog.open(EmployeedetailComponent, dialogConfig).afterClosed().subscribe(result => {
        this.getEmployees(); });
    }

    onDelete(dataRow) {
      this.service.deleteEmployee(dataRow.id).subscribe(response => { this.getEmployees(); });
   }

    onSearchClear() {
     this.searchKey = '';
     this.applyFilter();
   }
   refreshTable() {
     this.getEmployees();
   }

   applyFilter() {
     this.listData.filter = this.searchKey.trim().toLowerCase();
   }
  testGenerics<T>(items: T[]): T[] {
    const toreturn = [];
    for (let i = items.length - 1; i >= 0; i--) {
        toreturn.push(items[i]);
    }
    return toreturn;
 }
}
