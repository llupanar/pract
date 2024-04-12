import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaseService} from "./base-service.service";
import {Client} from "../models/client";
import {SwGroup} from "../models/swgroup";

@Injectable({
  providedIn: 'root'
})
export class SwgroupService extends BaseService<SwGroup> {
  constructor(http: HttpClient) {
    super(http, '/swgroup');
  }
}
