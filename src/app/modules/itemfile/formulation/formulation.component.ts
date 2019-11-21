import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { ItemFormulationService } from '../../../shared/itemformulation.service';
import { ItemFileService } from 'src/app/shared/itemfile.service';
import { Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { ItemFormulation } from './../../../shared/itemformulation.model';
import { Itemfile } from 'src/app/shared/itemfile.model';
import { DetailComponent } from '../formulation/detail/detail.component';
import { IngredientsComponent } from './../../formulation/ingredients/ingredients.component';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-formulation',
  templateUrl: './formulation.component.html',
  styleUrls: ['./formulation.component.scss']
})
export class FormulationComponent implements OnInit, AfterViewInit {
  param: string;
  constructor(private http: HttpClient, private service: ItemFormulationService,
              private dialog: MatDialog,
              private route: ActivatedRoute,
              private itemService: ItemFileService) {
                this.route.queryParams.subscribe(params => {
                  this.param = params.id ;
              });
              }
  itemFormulation: ItemFormulation;
  itemFormulations: ItemFormulation[];
   listData: MatTableDataSource<ItemFormulation>;
   displayedColumns: string[] = ['id', 'itemId', 'description', 'formQty', 'unit', 'createdBy', 'updatedBy', 'actions'];
   @ViewChild(MatSort, null) sort: MatSort;
   @ViewChild(MatPaginator, null) paginator: MatPaginator;
   searchKey: string;
   formulatedId: number;
   itemList: Itemfile[] = [];
   ngOnInit() {
    this.getItemList();
    if (this.param > '0') {
      this.formulatedId = +this.param;
      this.getFormulations(this.formulatedId);
    }

  }
  ngAfterViewInit() {
    // this.listData.sort = this.sort;
    // this.listData.paginator = this.paginator;
  }

  getFormulations(id) {
    this.service.getItems(id).subscribe(response => { this.service.items = response;
                                                      this.itemFormulations = response;
                                                      this.service.formulatedId = id;
                                                      this.listData = new MatTableDataSource(response);
                                                      this.listData.sort = this.sort;
                                                      this.listData.paginator = this.paginator;
    }
      , error => {console.log(error); } );
   }
   onViewRawMaterial() {
    const dialogConfig = new MatDialogConfig();
    const idx = null;
    const dataRow = this.service.form.value;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.data = {idx, dataRow};
    this.dialog.open(IngredientsComponent, dialogConfig).afterClosed().subscribe(result => {
    this.refreshTable(); });
  }
   onCreate() {
    this.service.initializeFormItem();
    const dialogConfig = new MatDialogConfig();
    const idx = null;
    const dataRow = this.service.form.value;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.data = {idx, dataRow};
    this.dialog.open(DetailComponent, dialogConfig).afterClosed().subscribe(result => {
    this.refreshTable(); });
  }

   onEdit(data) {
     this.service.populateForm(data);
     const idx = '1';
     const dialogConfig = new MatDialogConfig();
     const dataRow = data.id;
     dialogConfig.autoFocus = true;
     dialogConfig.disableClose = true ;
     dialogConfig.width = '50%';
     dialogConfig.data = {idx, dataRow};
     this.dialog.open(DetailComponent, dialogConfig).afterClosed().subscribe( result => { this.refreshTable(); });
   }

   getItemList() {
    this.itemService.getItems(0).subscribe(response => {this.itemList = response;
    }
    , error => {console.log(error); } );
  }
   onDelete(dataRow) {
     this.service.deleteItems(dataRow.id).subscribe(response => { this.getFormulations(this.formulatedId); } );
  }
  onFormulation(dataRow) {
    console.log('on formulation');
  }
  onChangeItem(newValue) {
    this.formulatedId = newValue.value;
    this.service.formulatedId = this.formulatedId;
    this.getFormulations(this.formulatedId);
  }
   onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }
  refreshTable() {
    this.getFormulations(this.formulatedId);
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }
}
