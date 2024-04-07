import {Client} from "./client";
import {Employee} from "./employee";
import {Lesson} from "./lesson";

export interface Visit {
  id: number;
  dateTime:string;
  attended:boolean;
  clientPassNaum: string;
  empPassNum:string;
  lessonId:number;
  client:Client;
  employee:Employee;
  lesson:Lesson;
}

