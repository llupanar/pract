import {Employee} from "./employee";

export interface Lesson{
  id:number;
  category: string;
  duration:number;
  empPassNum:string;
  employee:Employee;
}
