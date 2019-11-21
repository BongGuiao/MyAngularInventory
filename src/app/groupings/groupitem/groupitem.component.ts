import { GroupingService } from './../../shared/grouping.service';
import { Component, OnInit, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Grouping } from 'src/app/shared/grouping.model';
@Component({
  selector: 'app-groupitem',
  templateUrl: './groupitem.component.html',
  styleUrls: ['./groupitem.component.scss']
})
export class GroupitemComponent implements OnInit {
  public groupings: Grouping;
  title = 'Group Profile';
  groupFile = this.service.form;

  formData: Grouping;
  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<GroupitemComponent>, private service: GroupingService) {
    this.formData = data.dataRow;
  }
  ngOnInit() {
    this.groupFile.patchValue({
      createdBy: this.formData.createdBy,
      id : this.formData.id,
      description: this.formData.description,
      updatedBy : this.formData.updatedBy,
      groupCode : this.formData.groupCode
    });
    this.setGroupDescription();
  }

  onSubmit() {
    this.groupings = this.groupFile.value;
    console.log(this.data.idx);
    if (this.data.idx == null) {
      this.service.addGrouping(this.groupings);
    } else {
      this.service.updateGrouping(this.groupings, this.data.dataRow);
    }
    this.close();
  }
  close() {
    this.dialogRef.close();
  }
  setGroupDescription() {
    switch (this.formData.groupCode) {
      case '01': {
         this.title = 'ITEM Group Profile';
         break;
      }
      case '02': {
        this.title = 'MAJOR Group Profile';
        break;
     }
     case '03': {
      this.title = 'OVER Group Profile';
      break;
   }
   default: {
    this.title = 'GENERAL Group Profile';
    break;
      }
   }
  }

}
