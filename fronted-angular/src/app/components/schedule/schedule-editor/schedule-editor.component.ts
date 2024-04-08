import {Component, OnInit} from '@angular/core';
import {Lesson} from "../../../models/lesson";
import {SwGroup} from "../../../models/swgroup";
import {LessonService} from "../../../services/lesson.service";
import {SwgroupService} from "../../../services/swgroup.service";
import {ScheduleService} from "../../../services/schedule.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Schedule} from "../../../models/schedule";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-schedule-editor',
  templateUrl: './schedule-editor.component.html',
  styleUrl: './schedule-editor.component.css'
})
export class ScheduleEditorComponent implements OnInit{

  public id:number=0;
  public dayOfWeek:string="";
  public time:string="";
  public track:number=0;
  public lessons: Lesson[]=[];
  public groups: SwGroup[]=[];
  public lessonIndex:number=0;
  public groupIndex:number=0;

  constructor(private lessonService:LessonService, private groupService: SwgroupService,
              private scheduleService:ScheduleService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadLessons();
    this.loadGroups();
    this.loadSchedule();
  }

  loadSchedule(){
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.scheduleService.searchSchedule(id).subscribe(
        (response: Schedule) => {
          this.id=response.id;
          this.dayOfWeek=response.dayOfWeek;
          this.track=response.track;
          this.time=response.time;
        },
        (error: HttpErrorResponse) => {
          alert(error.status+" Oops");
        });
    });
  }
  loadLessons() {
    this.lessonService.getLessons().subscribe((result: any[]) => {
      this.lessons = result;
    });
  }

  loadGroups() {
    this.groupService.getSwGroups().subscribe((result: any[]) => {
      this.groups = result;
    });
  }

  public saveSchedule() {
    const schedule:Schedule={
      id:this.id,
      dayOfWeek:this.dayOfWeek,
      time:this.time,
      track:this.track,
      lessonId:this.lessons[this.lessonIndex].id,
      lesson:this.lessons[this.lessonIndex],
      swGroupId:this.groups[this.groupIndex].id,
      swGroup:this.groups[this.groupIndex]
    }
    this.scheduleService.updateSchedule(schedule).subscribe((response) => {
      console.log(response);
    });
  }

}
