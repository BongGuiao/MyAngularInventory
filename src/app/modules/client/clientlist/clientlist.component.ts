import { Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/shared/client.service';
import { Client } from './../../../shared/client.model';
import { ClientdetailComponent } from './../clientdetail/clientdetail.component';
@Component({
  selector: 'app-clientlist',
  templateUrl: './clientlist.component.html',
  styleUrls: ['./clientlist.component.scss']
})
export class ClientlistComponent implements OnInit {

  param: string;
  constructor(private http: HttpClient, private service: ClientService,
              private dialog: MatDialog, private route: ActivatedRoute) {
                this.route.queryParams.subscribe(params => {
                  this.param = params.id ;
              });
              }
   client: Client;
   clients: Client[] = [];

   listData: MatTableDataSource<Client>;
   displayedColumns: string[] = ['id', 'clientName', 'createdBy', 'updatedBy', 'actions'];
   @ViewChild(MatSort, null) sort: MatSort;
   @ViewChild(MatPaginator, null) paginator: MatPaginator;
   searchKey: string;

   ngOnInit() {
    this.getclients();
    if (this.param === 'SU') {
      this.service.title = 'Supplier File Maintenance';
    } else {
      this.service.title = 'Customer File Maintenance';
    }

  }
  getclients() {
    this.service.getClient(this.param).subscribe(response => {  this.service.clients = response;
                                                                this.clients = response;
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
    this.dialog.open(ClientdetailComponent, dialogConfig).afterClosed().subscribe(result => {
    this.getclients(); });
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
     this.dialog.open(ClientdetailComponent, dialogConfig);
   }


   onDelete(dataRow) {
     this.service.deleteClient(dataRow.id).subscribe(response => { this.getclients(); } );
  }
   initializeGroup() {
     this.client = {
        id: 0,
        classCode: '',
        clientName: '',
        address: '',
        cellphoneNo: '',
        landLine: '',
        faxNo: '',
        emailAddress: '',
        vatNo: '',
        contactPerson: '',
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
    this.getclients();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

}
