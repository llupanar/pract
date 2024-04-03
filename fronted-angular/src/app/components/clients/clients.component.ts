import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {Client} from "../../models/client";
import {ClientService} from "../../services/client.service";
import { ClientFilterPipe } from './client-filter.pipe';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css',
  providers: [ClientFilterPipe]

})
export class ClientsComponent implements OnInit{
  public clients: Client[]=[];
  public editClient: Client={
    passportNumber: "",
    fullName: "",
    medicalCertificate: false,
    employee_passport_number:"",
    subscription_id:0
  };
  public sClient: Client={
    passportNumber: "",
    fullName: "",
    medicalCertificate: false,
    employee_passport_number:"",
    subscription_id:0
  };
  public searchText:string='';

  constructor(private clientService: ClientService){}

  ngOnInit() {
    this.getClients();
  }
  public getClients(): void {
    this.clientService.getClients().subscribe(
      (response: Client[]) => {
        this.clients = response;
        console.log(this.clients);
      },
      (error: HttpErrorResponse) => {
        alert(error.status);
      }
    );
  }

  public deleteClientItem(client: Client): void {
    const confirmation = confirm('Are you sure?');
    if (confirmation) {
      this.clientService.deleteClient(client.passportNumber).subscribe(
        () => {
          const index = this.clients.indexOf(client);
          if (index !== -1) {
            this.clients.splice(index, 1);
          }
          this.getClients();
        },
        (error: HttpErrorResponse) => {
          alert('Delete client failed: ' + error.message);
        }
      );
    }
  }
}



