import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaseService} from "./base-service.service";
import {Client} from "../models/client";
import {Visit} from "../models/visit";

@Injectable({
  providedIn: 'root'
})
export class VisitService extends BaseService<Visit> {
  constructor(http: HttpClient) {
    super(http, '/visit');
  }
}
