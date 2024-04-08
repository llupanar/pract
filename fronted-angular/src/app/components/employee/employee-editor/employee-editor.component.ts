import {Component, OnInit} from '@angular/core';
import {JobTitle} from "../../../models/job_title";
import {EmployeeService} from "../../../services/employee.service";
import {JobTitleService} from "../../../services/job-title.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Employee} from "../../../models/employee";
import {Client} from "../../../models/client";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-employee-editor',
  templateUrl: './employee-editor.component.html',
  styleUrl: './employee-editor.component.css'
})
export class EmployeeEditorComponent implements OnInit{

  public passportNumber:string="";
  public fullName:string="";
  public experience:number=0;
  public jobTitleIndex:number=0;
  public jobTitles: JobTitle[]=[];
  constructor(private employeeService:EmployeeService, private jobTitleService: JobTitleService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadJobTitles();
    this.loadEmployee();
  }

  loadJobTitles() {
    this.jobTitleService.getJobTitles().subscribe((result: any[]) => {
      this.jobTitles = result;
    });
  }

  loadEmployee(){
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.employeeService.searchEmployee(id).subscribe(
        (response: Employee) => {
          this.passportNumber=response.passportNumber;
          this.fullName=response.fullName;
          this.experience=response.experience;
        },
        (error: HttpErrorResponse) => {
          alert(error.status+" Oops");
        });
    });
  }

  public saveEmployee() {
    const employee:Employee={
      passportNumber:this.passportNumber,
      fullName:this.fullName,
      experience:this.experience,
      position:this.jobTitles[this.jobTitleIndex].position,
      jobTitle:this.jobTitles[this.jobTitleIndex]
    }
    this.employeeService.addEmployee(employee).subscribe((response) => {
      console.log(response);
    });
  }
}
