import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaseService} from "./base-service.service";
import {Client} from "../models/client";
import {PoolSubscription} from "../models/pool_subscription";

@Injectable({
  providedIn: 'root'
})
export class PoolSubscriptionService extends BaseService<PoolSubscription> {
  constructor(http: HttpClient) {
    super(http, '/pool_subscription');
  }
}
