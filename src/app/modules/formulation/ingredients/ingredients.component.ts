
import { Component, OnInit, Inject , ViewChild} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar } from '@angular/material';
import { ItemFormulationService } from 'src/app/shared/itemformulation.service';
import { PoHeadService } from 'src/app/shared/pohead.service';
import { Itemfile } from 'src/app/shared/itemfile.model';
import { RawMaterialcte } from './../../../shared/rawmaterialcte.model';
import { ItemFormulation } from 'src/app/shared/itemformulation.model';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent implements OnInit {
  public formulation: ItemFormulation;
  isLoaded =  false;
  formDetail = this.service.form;
  title = 'Item Formulation';
  itemFile = this.service.form;
  itemList: Itemfile[] = [];
  unitValue: number;

  formData: ItemFormulation;
  listData: MatTableDataSource<RawMaterialcte>;
  displayedColumns: string[] = ['itemId', 'description', 'reqQty', 'unit', 'unitCost'];
  @ViewChild(MatSort, null) sort: MatSort;
  @ViewChild(MatPaginator, null) paginator: MatPaginator;
  searchKey: string;
  constructor(@Inject(MAT_DIALOG_DATA)  public data,
              public dialogRef: MatDialogRef<IngredientsComponent >,
              private service: ItemFormulationService,
              private poService: PoHeadService) {
    this.formData = data.dataRow;
  }
  ngOnInit() {
    this.getItemList();
  }

  getItemList() {
    this.service.generateRequiredIngredients(this.data.poId.id)
    .subscribe(response => { this.listData = new MatTableDataSource(response);
                             this.poService.rawMatList = response;
                             this.listData.sort = this.sort;
                             this.listData.paginator = this.paginator; }
    , error => {console.log(error); } );
  }
  close() {
    this.dialogRef.close();
  }
}
