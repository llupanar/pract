import {Component, OnInit} from '@angular/core';
import {Client} from "../../../models/client";
import {ClientService} from "../../../services/client.service";
import {Employee} from "../../../models/employee";
import {PoolSubscription} from "../../../models/pool_subscription";
import {PoolSubscriptionService} from "../../../services/pool-subscription.service";
import {EmployeeService} from "../../../services/employee.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-client-creator',
  templateUrl: './client-creator.component.html',
  styleUrl: './client-creator.component.css'
})
export class ClientCreatorComponent implements OnInit{

  public passportNumber:string="";
  public fullName:string="";
  public medCertificate:boolean=false;
  public employees:Employee[]=[];
  public subscriptions:PoolSubscription[]=[];
  public employeeIndex:number=0;
  public subscriptionIndex:number=0;

  constructor(private clientService: ClientService, private subscriptionService:PoolSubscriptionService,
              private employeeService:EmployeeService, private router: Router) { }

  ngOnInit() {
    this.loadEmployees();
    this.loadSubscriptions();
    if(this.isAvailable()){
      alert('You cant create client without employee and subscription. Create them');
      this.router.navigate(['/clients']);
    }
  }

  isAvailable(){
    return (this.employees && this.employees.length > 0 && this.employees&&this.subscriptions.length>0);
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

  public saveClient() {
    const client:Client={
      passportNumber:this.passportNumber,
      fullName:this.fullName,
      medicalCertificate:this.medCertificate,
      subscriptionId:this.subscriptions[this.subscriptionIndex].id,
      empPassNum:this.employees[this.employeeIndex].passportNumber,
      employee:this.employees[this.employeeIndex],
      subscription:this.subscriptions[this.subscriptionIndex]
    }
    this.clientService.addClient(client).subscribe((response) => {
      console.log(response);
    });
  }
}
