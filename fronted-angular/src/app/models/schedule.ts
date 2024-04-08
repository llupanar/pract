import {Lesson} from "./lesson";
import {SwGroup} from "./swgroup";

export interface Schedule {
  id: number;
  dayOfWeek:string;
  time:string;
  track: number;
  lessonId:number;
  swGroupId:number;
  lesson:Lesson;
  swGroup:SwGroup;
}

