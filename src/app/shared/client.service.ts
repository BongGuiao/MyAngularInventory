import { Client } from './Client.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  constructor(private http: HttpClient) {}
  formData: Client;
  clients: Client[];
  title: string;
  form: FormGroup = new FormGroup({
    id: new FormControl('0'),
    clientName: new FormControl(''),
    classCode: new FormControl(''),
    address: new FormControl(''),
    emailAddress: new FormControl(''),
    cellphoneNo: new FormControl(''),
    landLine: new FormControl(''),
    faxNo: new FormControl(''),
    vatNo: new FormControl(''),
    contactPerson: new FormControl(''),
    createdBy: new FormControl(''),
    updatedBy: new FormControl(''),
    dateCreated : new FormControl(''),
    dateUpdated : new FormControl('')
  });
    getClient(id) {
      return this.http.get<Client[]>('http://localhost:34905/api/Clients/GetByClassCode/' + id);
    }

    addClients(client: Client) {
      return this.http.post<Client>('http://localhost:34905/api/Clients', client, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      });
    }
    deleteClient(id) {
      return this.http.delete<Client>('http://localhost:34905/api/Clients/' + id, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      });
    }
    updateClients(client: Client, id: number) {
      return this.http.put<Client>('http://localhost:34905/api/Clients/' + id, client, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      });
    }

    updateClient(client: Client, index: number) {
      let idx: number ;
      idx = 0 ;
      for (const idata of this.clients) {
        if (idata.id === client.id) {
          break;
        }
        idx += 1;
      }
      this.clients[idx].id = client.id;
      this.clients[idx].clientName = client.clientName;
      this.updateClients(client, client.id).subscribe(
        response => { client = response; }
      , error => {console.log(error); } );
    }

  addClient(client: Client) {
    this.addClients(client).subscribe(
      response => { client = response; this.clients.push(response); }
      , error => {console.log(error); } );
  }
  populateForm(client: Client) {
    this.form.setValue(client);
  }
  initializeFormGroup(clientId) {
    this.form.setValue({
      id: 0,
      clientName: '',
      classCode: '',
      address: '',
      emailAddress: '',
      landLine: '',
      cellphoneNo: '',
      faxNo: '',
      vatNo: '',
      contactPerson: '',
      createdBy: 'system',
      dateCreated: '',
      updatedBy: 'system',
      dateUpdated: ''
    });
    console.log(this.form.value);
  }
}
