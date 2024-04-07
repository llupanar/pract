import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PoolSubscription} from "../models/pool_subscription";

@Injectable({
  providedIn: 'root'
})
export class PoolSubscriptionService {
  private apiServerUrl = "http://localhost:8080/api/v1/pool_subscription"
  constructor(private http: HttpClient){}

  public getPoolSubscriptions(): Observable<PoolSubscription[]> {
    return this.http.get<PoolSubscription[]>(`${this.apiServerUrl}`);
  }

  public addPoolSubscription(poolSubscription: PoolSubscription): Observable<PoolSubscription> {
    return this.http.post<PoolSubscription>(`${this.apiServerUrl}/`, poolSubscription);
  }

  public updatePoolSubscription(poolSubscription: PoolSubscription): Observable<PoolSubscription> {
    return this.http.put<PoolSubscription>(`${this.apiServerUrl}/${poolSubscription.id}`, poolSubscription);
  }

  public deletePoolSubscription(poolSubscriptionId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/${poolSubscriptionId}`);
  }

  public searchSub(poolSubscriptionId: string): Observable<PoolSubscription> {
    return this.http.get<PoolSubscription>(`${this.apiServerUrl}/${poolSubscriptionId}`);
  }
}
