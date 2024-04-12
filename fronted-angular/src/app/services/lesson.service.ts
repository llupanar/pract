import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaseService} from "./base-service.service";
import {Client} from "../models/client";
import {Lesson} from "../models/lesson";

@Injectable({
  providedIn: 'root'
})
export class LessonService extends BaseService<Lesson> {
  constructor(http: HttpClient) {
    super(http, '/lesson');
  }
}
