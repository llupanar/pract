import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Lesson} from "../models/lesson";

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  private apiServerUrl = "http://localhost:8080/api/v1/lesson"
  constructor(private http: HttpClient){}

  public getLessons(): Observable<Lesson[]> {
    return this.http.get<Lesson[]>(`${this.apiServerUrl}`);
  }

  public addLesson(lesson: Lesson): Observable<Lesson> {
    return this.http.post<Lesson>(`${this.apiServerUrl}/add`, lesson);
  }

  public updateLesson(lesson: Lesson): Observable<Lesson> {
    return this.http.put<Lesson>(`${this.apiServerUrl}/delete`, lesson);
  }

  public deleteLesson(lessonId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/employee/delete/${lessonId}`);
  }

  public searchLesson(lessonId: string): Observable<void> {
    return this.http.get<void>(`${this.apiServerUrl}/${lessonId}`);
  }
}
