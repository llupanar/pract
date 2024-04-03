import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Client} from "../models/client";

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiServerUrl = "http://localhost:8080/api/v1/client"
  constructor(private http: HttpClient){}

  public getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiServerUrl}`);
  }

  public addClient(client: Client): Observable<Client> {
    return this.http.post<Client>(`${this.apiServerUrl}`, client);
  }

  public updateClient(client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.apiServerUrl}`, client);
  }

  public deleteClient(clientId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/${clientId}`);
  }

  public searchClient(clientId: string): Observable<void> {
    return this.http.get<void>(`${this.apiServerUrl}/${clientId}`);
  }
}
