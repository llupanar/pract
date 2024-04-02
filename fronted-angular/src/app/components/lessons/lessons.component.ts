import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {Lesson} from "../../models/lesson";
import {LessonService} from "../../services/lesson.service";

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrl: './lessons.component.css'
})
export class LessonsComponent implements OnInit{
  public lessons: Lesson[]=[];
  public editLesson: Lesson={
    id:0,
    category: "",
    duration: 0,
    employee_passport_number:""
  };
  public deleteLesson: Lesson={
    id:0,
    category: "",
    duration: 0,
    employee_passport_number:""
  };

  constructor(private lessonService: LessonService){}

  ngOnInit() {
    this.getLessons();
  }

  public getLessons(): void {
    this.lessonService.getLessons().subscribe(
      (response: Lesson[]) => {
        this.lessons = response;
        console.log(this.lessons);
      },
      (error: HttpErrorResponse) => {
        alert(error.status);
      }
    );
  }
}
