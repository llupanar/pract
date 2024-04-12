import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Client} from "../models/client";
import {BaseService} from "./base-service.service";

@Injectable({
  providedIn: 'root'
})
export class ClientService extends BaseService<Client> {
  constructor(http: HttpClient) {
    super(http, '/client');
  }
}
