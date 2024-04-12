import {Component, OnInit} from '@angular/core';
import {LessonService} from "../../../services/lesson.service";
import {Router} from "@angular/router";
import {Lesson} from "../../../models/lesson";
import {SwGroup} from "../../../models/swgroup";
import {SwgroupService} from "../../../services/swgroup.service";
import {ScheduleService} from "../../../services/schedule.service";
import {Schedule} from "../../../models/schedule";

@Component({
  selector: 'app-schedule-creator',
  templateUrl: './schedule-creator.component.html',
  styleUrl: './schedule-creator.component.css'
})
export class ScheduleCreatorComponent implements OnInit {

  public id: number = 0;
  public dayOfWeek: string = "";
  public time: string = "";
  public track: number = 0;
  public lessons: Lesson[] = [];
  public groups: SwGroup[] = [];
  public lessonIndex: number = 0;
  public groupIndex: number = 0;

  constructor(private lessonService: LessonService, private groupService: SwgroupService,
              private scheduleService: ScheduleService, private router: Router) {
  }

  ngOnInit() {
    this.loadLessons();
    this.loadGroups();
    if (this.isAvailable()) {
      alert('You cant create schedule without groups and lessons. Create them');
      this.router.navigate(['/schedules']);
    }
    this.scheduleService.getAll().subscribe((result: any[]) => {
      let uniqueId = 1;
      const idSet = new Set(result.map(item => item.id));
      while (idSet.has(uniqueId)) {
        uniqueId++;
      }
      this.id = uniqueId;
    });
  }

  isAvailable() {
    return (this.lessons && this.lessons.length > 0 && this.groups && this.groups.length > 0);
  }

  loadLessons() {
    this.lessonService.getAll().subscribe((result: any[]) => {
      this.lessons = result;
    });
  }

  loadGroups() {
    this.groupService.getAll().subscribe((result: any[]) => {
      this.groups = result;
    });
  }

  public saveSchedule() {
    const schedule: Schedule = {
      id: this.id,
      dayOfWeek: this.dayOfWeek,
      time: this.time,
      track: this.track,
      lessonId: this.lessons[this.lessonIndex].id,
      lesson: this.lessons[this.lessonIndex],
      swGroupId: this.groups[this.groupIndex].id,
      swGroup: this.groups[this.groupIndex]
    }
    this.scheduleService.create(schedule).subscribe((response) => {
      console.log(response);
    });
  }
}
