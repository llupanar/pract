import {SwGroup} from "./swgroup";

export interface PoolSubscription {
  id: number;
  type:string;
  cost:number;
  endDate: string;
  swGroupId:number;
  swgroup:SwGroup;
}

