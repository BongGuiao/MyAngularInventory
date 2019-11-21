import { Component, OnInit, Inject , ViewChild} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar } from '@angular/material';
import { ItemFormulationService } from 'src/app/shared/itemformulation.service';
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
  rawMatList: RawMaterialcte[] = [];
  unitValue: number;

  formData: ItemFormulation;
  listData: MatTableDataSource<RawMaterialcte>;
  displayedColumns: string[] = ['itemId', 'description', 'reqQty', 'unit', 'unitCost'];
  @ViewChild(MatSort, null) sort: MatSort;
  @ViewChild(MatPaginator, null) paginator: MatPaginator;
  searchKey: string;
  constructor(@Inject(MAT_DIALOG_DATA)  public data,
              public dialogRef: MatDialogRef<IngredientsComponent >,
              private service: ItemFormulationService) {
    this.formData = data.dataRow;
  }
  ngOnInit() {
    this.getItemList();
  }

  onSubmit() {
    this.formData = this.itemFile.value;
    if (this.data.idx == null) {
      this.service.addItems (this.formData)
      .subscribe(resp => {console.log(resp); });
    } else {
      this.service.updateItems(this.formData, this.data.dataRow)
      .subscribe(resp => { console.log(resp); });
    }
    this.close();
  }
  getItemList() {
    this.service.generateRequiredIngredients(this.data.poId.id)
    .subscribe(response => { this.rawMatList = response;
                             console.log(response);
                             this.listData = new MatTableDataSource(response);
                             this.listData.sort = this.sort;
                             this.listData.paginator = this.paginator; }
    , error => {console.log(error); } );
  }
  close() {
    this.dialogRef.close();
  }
}
