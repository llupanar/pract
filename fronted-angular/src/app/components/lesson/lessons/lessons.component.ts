import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {Lesson} from "../../../models/lesson";
import {LessonService} from "../../../services/lesson.service";
import {LessonFilterPipe} from "./lesson-filter.pipe";

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrl: './lessons.component.css',
  providers:[LessonFilterPipe]
})
export class LessonsComponent implements OnInit{
  public lessons: Lesson[]=[];

  public searchText:string='';

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

  public deleteLessonItem(lesson: Lesson): void {
    const confirmation = confirm('Are you sure?');
    if (confirmation) {
      this.lessonService.deleteLesson(lesson.id).subscribe(
        () => {
          const index = this.lessons.indexOf(lesson);
          if (index !== -1) {
            this.lessons.splice(index, 1);
          }
          this.getLessons();
        },
        (error: HttpErrorResponse) => {
          alert('Delete lesson failed ' + error.message);
        }
      );
    }
  }

}
