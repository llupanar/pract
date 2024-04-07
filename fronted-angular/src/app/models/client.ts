import {PoolSubscription} from "./pool_subscription";
import {Employee} from "./employee";
export interface Client{
  passportNumber: string;
  fullName: string;
  medicalCertificate: boolean;
  empPassNum:string;
  subscriptionId:number;
  employee:Employee;
  subscription:PoolSubscription;
}

