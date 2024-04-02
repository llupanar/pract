import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {Client} from "../../models/client";
import {ClientService} from "../../services/client.service";

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
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
  public deleteClient: Client={
    passportNumber: "",
    fullName: "",
    medicalCertificate: false,
    employee_passport_number:"",
    subscription_id:0
  };

  constructor(private jobTitleService: ClientService){}

  ngOnInit() {
    this.getClients();
  }

  public getClients(): void {
    this.jobTitleService.getClients().subscribe(
      (response: Client[]) => {
        this.clients = response;
        console.log(this.clients);
      },
      (error: HttpErrorResponse) => {
        alert(error.status);
      }
    );
  }

}
