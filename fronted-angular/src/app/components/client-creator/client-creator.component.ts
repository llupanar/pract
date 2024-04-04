import { Component } from '@angular/core';
import {Client, Employee, PoolSubscription} from "../../models/client";
import {ClientService} from "../../services/client.service";

@Component({
  selector: 'app-client-creator',
  templateUrl: './client-creator.component.html',
  styleUrl: './client-creator.component.css'
})
export class ClientCreatorComponent {

  public employee:Employee={passportNumber:""};
  public poolSubscription:PoolSubscription={id:0};
  public client: Client={
    passportNumber: "",
    fullName: "",
    medicalCertificate: false,
    employee_passport_number:"",
    subscription_id:0,
    employee:this.employee,
    poolSubscription:this.poolSubscription
  };
  constructor(private clientService: ClientService) { }

  public saveClient(){
    this.clientService.addClient(this.client).subscribe((response) => {
      console.log(response);
      this.client = {
        passportNumber: "",
        fullName: "",
        medicalCertificate: false,
        employee_passport_number:"",
        subscription_id:0,
        employee:this.employee,
        poolSubscription:this.poolSubscription
      };
    });
  }

}
