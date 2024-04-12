import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaseService} from "./base-service.service";
import {Client} from "../models/client";
import {Employee} from "../models/employee";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends BaseService<Employee> {
  constructor(http: HttpClient) {
    super(http, '/employee');
  }
}
