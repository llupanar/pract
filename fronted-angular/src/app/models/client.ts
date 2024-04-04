export interface Client {
  passportNumber: string;
  fullName: string;
  medicalCertificate: boolean;
  employee_passport_number:string;
  subscription_id:number;
  employee:Employee;
  poolSubscription:PoolSubscription;
}
export interface Employee {
  passportNumber: string;
}

export interface PoolSubscription {
  id: number;
}
