import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ClientService} from "../../../services/client.service";
import {PoolSubscriptionService} from "../../../services/pool-subscription.service";
import {EmployeeService} from "../../../services/employee.service";
import {Employee} from "../../../models/employee";
import {PoolSubscription} from "../../../models/pool_subscription";
import {HttpErrorResponse} from "@angular/common/http";
import {Client} from "../../../models/client";

@Component({
  selector: 'app-client-editor',
  templateUrl: './client-editor.component.html',
  styleUrl: './client-editor.component.css'
})
export class ClientEditorComponent implements OnInit{

  public passportNumber:string="";
  public fullName:string="";
  public medCertificate:boolean=false;
  public employees:Employee[]=[];
  public subscriptions:PoolSubscription[]=[];
  public employeeIndex:number=0;
  public subscriptionIndex:number=0;

  constructor(private clientService: ClientService, private subscriptionService:PoolSubscriptionService,
              private employeeService:EmployeeService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.loadEmployees();
    this.loadSubscriptions();
    this.loadClient();
  }
  loadEmployees() {
    this.employeeService.getEmployees().subscribe((result: any[]) => {
      this.employees = result;
    });
  }

  loadSubscriptions() {
    this.subscriptionService.getPoolSubscriptions().subscribe((result: any[]) => {
      this.subscriptions = result;
    });
  }

  loadClient(){
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.clientService.searchClient(id).subscribe(
        (response: Client) => {
          this.passportNumber=response.passportNumber;
          this.fullName=response.fullName;
          this.medCertificate=response.medicalCertificate;
        },
        (error: HttpErrorResponse) => {
          alert(error.status+" Oops");
        });
    });
  }

  saveClient(){
    const client:Client={
      passportNumber:this.passportNumber,
      fullName:this.fullName,
      medicalCertificate:this.medCertificate,
      subscriptionId:this.subscriptions[this.subscriptionIndex].id,
      empPassNum:this.employees[this.employeeIndex].passportNumber,
      employee:this.employees[this.employeeIndex],
      subscription:this.subscriptions[this.subscriptionIndex]
    }
    this.clientService.updateClient(client).subscribe((response) => {
      console.log(response);
    });
  }
}
