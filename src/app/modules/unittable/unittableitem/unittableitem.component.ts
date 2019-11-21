import { UnitTable } from './../../../shared/UnitTable.model';
import { UnitTableService } from 'src/app/shared/unittable.service';
import { Component, OnInit, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
@Component({
  selector: 'app-unittableitem',
  templateUrl: './unittableitem.component.html',
  styleUrls: ['./unittableitem.component.scss']
})
export class UnitTableitemComponent implements OnInit {
  public unitTable: UnitTable;
  title = 'Unit Table Profile';
  unittableFile = this.service.form;

  formData: UnitTable;
  constructor(@Inject(MAT_DIALOG_DATA)  public data,
              public dialogRef: MatDialogRef<UnitTableitemComponent>,
              private service: UnitTableService) {
    this.formData = data.dataRow;
  }
  ngOnInit() {
    this.unittableFile.patchValue({
      createdBy: this.formData.createdBy,
      id : this.formData.id,
      description: this.formData.description,
      unitValue : this.formData.unitValue,
      updatedBy : this.formData.updatedBy,
    });
  }

  onSubmit() {
    this.unitTable = this.unittableFile.value;
    if (this.data.idx == null) {
      this.service.addUnitTable(this.unitTable);
    } else {
      this.service.updateUnitTable(this.unitTable, this.data.dataRow);
    }
    this.close();
  }
  close() {
    this.dialogRef.close();
  }
}

