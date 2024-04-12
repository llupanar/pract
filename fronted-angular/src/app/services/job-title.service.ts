import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaseService} from "./base-service.service";
import {Client} from "../models/client";
import {JobTitle} from "../models/job_title";

@Injectable({
  providedIn: 'root'
})
export class JobTitleService extends BaseService<JobTitle> {
  constructor(http: HttpClient) {
    super(http, '/job_title');
  }
}
