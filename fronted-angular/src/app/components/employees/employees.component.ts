import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {Employee} from "../../models/employee";
import {EmployeeService} from "../../services/employee.service";
import { EmployeeFilterPipe } from './employee-filter.pipe';


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css',
  providers:[EmployeeFilterPipe]
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
  public searchText:string='';


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

  public deleteEmployeeItem(employee: Employee): void {
    const confirmation = confirm('Are you sure?');
    if (confirmation) {
      this.employeeService.deleteEmployee(employee.passportNumber).subscribe(
        () => {
          const index = this.employees.indexOf(employee);
          if (index !== -1) {
            this.employees.splice(index, 1);
          }
          this.getEmployees();
        },
        (error: HttpErrorResponse) => {
          alert('Delete employee failed ' + error.message);
        }
      );
    }
  }

}
