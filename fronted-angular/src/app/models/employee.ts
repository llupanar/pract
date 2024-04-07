import {JobTitle} from "./job_title";

export interface Employee {
  passportNumber: string;
  fullName: string;
  experience: number;
  position:string;
  jobTitle:JobTitle;
}
