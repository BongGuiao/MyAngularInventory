import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { GroupitemComponent } from './../groupitem/groupitem.component';
import { HttpClient } from '@angular/common/http';
import { GroupingService } from './../../shared/grouping.service';
import { Grouping } from './../../shared/grouping.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-groupings',
  templateUrl: './groupings.component.html',
  styleUrls: ['./groupings.component.scss']
})
export class GroupingsComponent implements OnInit, AfterViewInit {
  param: string;
  constructor(private http: HttpClient, private service: GroupingService,
              private dialog: MatDialog, private route: ActivatedRoute) {
                this.route.queryParams.subscribe(params => {
                  this.param = params.id ;
              });
              }
   group: Grouping;
   groups: Grouping[] = [];

   listData: MatTableDataSource<Grouping>;
   displayedColumns: string[] = ['id', 'description', 'groupCode', 'createdBy', 'updatedBy', 'actions'];
   @ViewChild(MatSort, null) sort: MatSort;
   @ViewChild(MatPaginator, null) paginator: MatPaginator;
   searchKey: string;

   ngOnInit() {
    this.getGroupings();
    console.log(this.param);
  }
  ngAfterViewInit() {
    // this.listData.sort = this.sort;
    // this.listData.paginator = this.paginator;
  }

  getGroupings() {
    this.service.getGroupings(this.param).subscribe(response => { this.service.groups = response;
                                                                  this.groups = response; this.listData = new MatTableDataSource(response);
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
    this.dialog.open(GroupitemComponent, dialogConfig).afterClosed().subscribe(result => {
    this.refreshTable(); });
  }

   onEdit(dataRow) {
     dataRow.groupCode = dataRow.groupCode.trim();
     this.service.populateForm(dataRow);
     const idx = '1';
     const dialogConfig = new MatDialogConfig();
     dialogConfig.autoFocus = true;
     dialogConfig.disableClose = true ;
     dialogConfig.width = '50%';
     dialogConfig.data = {idx, dataRow};
     this.dialog.open(GroupitemComponent, dialogConfig);
   }


   onDelete(dataRow) {
     this.service.deleteGroupings(dataRow.id).subscribe(response => { this.getGroupings(); } );
  }
   initializeGroup() {
     this.group = {
        id: 0,
        description: '',
        groupCode: this.param,
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
    this.getGroupings();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }
}
