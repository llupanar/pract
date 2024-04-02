import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Visit} from "../models/visit";

@Injectable({
  providedIn: 'root'
})
export class VisitService {
  private apiServerUrl = "http://localhost:8080/api/v1/visit"
  constructor(private http: HttpClient){}

  public getVisits(): Observable<Visit[]> {
    return this.http.get<Visit[]>(`${this.apiServerUrl}`);
  }

  public addVisit(visit: Visit): Observable<Visit> {
    return this.http.post<Visit>(`${this.apiServerUrl}`, visit);
  }

  public updateVisit(visit: Visit): Observable<Visit> {
    return this.http.put<Visit>(`${this.apiServerUrl}`, visit);
  }

  public deleteVisit(visitId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/${visitId}`);
  }
}
