import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {Employee} from "../../models/employee";
import {EmployeeService} from "../../services/employee.service";

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent implements OnInit{
  public employees: Employee[]=[];
  public editEmployee: Employee={
    passportNumber: "",
    fullName: "",
    experience: 0,
    position:""
  };
  public deleteEmployee: Employee={
    passportNumber: "",
    fullName: "",
    experience: 0,
    position:""
  };

  constructor(private employeeService: EmployeeService){}

  ngOnInit() {
    this.getEmployees();
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
        console.log(this.employees);
      },
      (error: HttpErrorResponse) => {
        alert(error.status);
      }
    );
  }

}
