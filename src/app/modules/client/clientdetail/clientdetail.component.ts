import { Component, OnInit, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Client } from './../../../shared/client.model';
import { ClientService } from 'src/app/shared/client.service';
@Component({
  selector: 'app-clientdetail',
  templateUrl: './clientdetail.component.html',
  styleUrls: ['./clientdetail.component.scss']
})
export class ClientdetailComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data,
              public dialogRef: MatDialogRef<ClientdetailComponent>,
              private service: ClientService) {
  this.formData = data.dataRow;
}
  public client: Client;
  title = this.service.title;
  clientFile = this.service.form;

  formData: Client;

  ngOnInit() {
    this.clientFile.patchValue({
      createdBy: this.formData.createdBy,
      id : this.formData.id,
      classCode: this.formData.classCode,
      clientName: this.formData.clientName,
      updatedBy : this.formData.updatedBy,
      address: this.formData.address,
      emailAddress: this.formData.emailAddress,
      cellphoneNo: this.formData.cellphoneNo,
      landLineNo: this.formData.landLine,
      faxNo: this.formData.faxNo,
      vatNo: this.formData.vatNo,
      dateCreated: '',
      dateUpdated: ''
    });
  }

  onSubmit() {
    this.client = this.clientFile.value;
    if (this.data.idx == null) {
      this.service.addClient(this.client);
    } else {
      this.service.updateClient(this.client, this.data.dataRow);
    }
    this.close();
  }
  close() {
    this.dialogRef.close();
  }
}

