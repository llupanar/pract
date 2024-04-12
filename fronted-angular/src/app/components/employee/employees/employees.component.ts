import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {Employee} from "../../../models/employee";
import {EmployeeService} from "../../../services/employee.service";
import {EmployeeFilterPipe} from './employee-filter.pipe';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  providers: [EmployeeFilterPipe]
})
export class EmployeesComponent implements OnInit {
  public employees: Employee[] = [];

  public searchText: string = '';

  constructor(private employeeService: EmployeeService) {
  }

  ngOnInit() {
    this.getEmployees();
  }

  public getEmployees(): void {
    this.employeeService.getAll().subscribe(
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
      this.employeeService.delete(employee.passportNumber).subscribe(
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
