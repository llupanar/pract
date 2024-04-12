import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaseService} from "./base-service.service";
import {Client} from "../models/client";
import {Schedule} from "../models/schedule";

@Injectable({
  providedIn: 'root'
})
export class ScheduleService extends BaseService<Schedule> {
  constructor(http: HttpClient) {
    super(http, '/schedule');
  }
}
