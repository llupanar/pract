import {Component, OnInit} from '@angular/core';
import {Employee} from "../../../models/employee";
import {EmployeeService} from "../../../services/employee.service";
import {JobTitleService} from "../../../services/job-title.service";
import { Router } from '@angular/router';
import {JobTitle} from "../../../models/job_title";

@Component({
  selector: 'app-employee-creator',
  templateUrl: './employee-creator.component.html',
  styleUrl: './employee-creator.component.css'
})
export class EmployeeCreatorComponent implements OnInit{
  public passportNumber:string="";
  public fullName:string="";
  public experience:number=0;
  public jobTitleIndex:number=0;
  public jobTitles: JobTitle[]=[];
  constructor(private employeeService:EmployeeService, private jobTitleService: JobTitleService, private router: Router) { }

  ngOnInit() {
    this.loadJobTitles();
    if(this.isAvailable()){
      alert('You cant create employee without job positions. Create them');
      this.router.navigate(['/employees']);
    }
  }

  isAvailable(){
    return (this.jobTitles && this.jobTitles.length > 0 );
  }

  loadJobTitles() {
    this.jobTitleService.getAll().subscribe((result: any[]) => {
      this.jobTitles = result;
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
    this.employeeService.create(employee).subscribe((response) => {
      console.log(response);
    });
  }

}
