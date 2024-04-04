import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SwGroup} from "../models/swgroup";

@Injectable({
  providedIn: 'root'
})
export class SwgroupService {
  private apiServerUrl = "http://localhost:8080/api/v1/swgroup"
  constructor(private http: HttpClient){}

  public getSwGroups(): Observable<SwGroup[]> {
    return this.http.get<SwGroup[]>(`${this.apiServerUrl}`);
  }

  public addSwGroup(swgroup: SwGroup): Observable<SwGroup> {
    return this.http.post<SwGroup>(`${this.apiServerUrl}/`,swgroup);
  }

  public updateSwGroup(swgroup: SwGroup): Observable<SwGroup> {
    return this.http.put<SwGroup>(`${this.apiServerUrl}/`,swgroup);
  }

  public deleteSwGroup(swgroupId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/${swgroupId}`);
  }

  public searchSwGroup(swgroupId: string): Observable<void> {
    return this.http.get<void>(`${this.apiServerUrl}/${swgroupId}`);
  }
}
