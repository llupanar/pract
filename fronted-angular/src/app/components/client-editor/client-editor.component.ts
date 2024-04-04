import {Component, OnInit} from '@angular/core';
import {Client, Employee, PoolSubscription} from "../../models/client";
import {ClientService} from "../../services/client.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-client-editor',
  templateUrl: './client-editor.component.html',
  styleUrl: './client-editor.component.css'
})
export class ClientEditorComponent implements OnInit{

  public passportNumber:string | null="";
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
  }
  constructor(private route: ActivatedRoute,private studentService: ClientService) { }
  ngOnInit() {
    this.passportNumber=this.route.snapshot.paramMap.get('id');
  }

  public updateStudent() {
    if (this.passportNumber != null) {
      this.client.passportNumber = this.passportNumber;
    }
    this.studentService.updateClient(this.client).subscribe((response) => {
      console.log(response);
    });
  }
}
