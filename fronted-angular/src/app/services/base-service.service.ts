import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class BaseService<T> {
  constructor(private http: HttpClient, @Inject('API_URL') private apiUrl: string) {
  }

  private get fullUrl(): string {
    return `${environment.baseUrl}${this.apiUrl}`;
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.fullUrl);
  }

  getById(id: string): Observable<T> {
    return this.http.get<T>(`${this.fullUrl}/${id}`);
  }

  create(item: T): Observable<T> {
    return this.http.post<T>(this.fullUrl, item);
  }

  update(id: string, item: T): Observable<T> {
    return this.http.put<T>(`${this.fullUrl}/${id}`, item);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.fullUrl}/${id}`);
  }
}
