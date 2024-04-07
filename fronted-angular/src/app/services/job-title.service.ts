import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {JobTitle} from "../models/job_title";

@Injectable({
  providedIn: 'root'
})
export class JobTitleService {
  private apiServerUrl = "http://localhost:8080/api/v1/job_title"
  constructor(private http: HttpClient){}

  public getJobTitles(): Observable<JobTitle[]> {
    return this.http.get<JobTitle[]>(`${this.apiServerUrl}`);
  }

  public addJobTitle(jobTitle: JobTitle): Observable<JobTitle> {
    return this.http.post<JobTitle>(`${this.apiServerUrl}`, jobTitle);
  }

  public updateJobTitle(jobTitle: JobTitle): Observable<JobTitle> {
    return this.http.put<JobTitle>(`${this.apiServerUrl}/${jobTitle.position}`, jobTitle);
  }

  public deleteJobTitle(jobTitleId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/${jobTitleId}`);
  }

  public searchJobTitle(jobTitleId: string): Observable<JobTitle> {
    return this.http.get<JobTitle>(`${this.apiServerUrl}/${jobTitleId}`);
  }

}
