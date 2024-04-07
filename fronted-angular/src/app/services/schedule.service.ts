import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Schedule} from "../models/schedule";

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private apiServerUrl = "http://localhost:8080/api/v1/schedule"

  constructor(private http: HttpClient){}

  public getSchedules(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(`${this.apiServerUrl}`);
  }

  public addSchedule(schedule: Schedule): Observable<Schedule> {
    return this.http.post<Schedule>(`${this.apiServerUrl}`, schedule);
  }

  public updateSchedule(schedule: Schedule): Observable<Schedule> {
    return this.http.put<Schedule>(`${this.apiServerUrl}/${schedule.id}`, schedule);
  }

  public deleteSchedule(scheduleId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/${scheduleId}`);
  }

  public searchSchedule(scheduleId: string): Observable<Schedule> {
    return this.http.get<Schedule>(`${this.apiServerUrl}/${scheduleId}`);
  }

}
