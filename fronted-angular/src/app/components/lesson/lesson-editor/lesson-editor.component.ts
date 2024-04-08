import {Component, OnInit} from '@angular/core';
import {Employee} from "../../../models/employee";
import {EmployeeService} from "../../../services/employee.service";
import {LessonService} from "../../../services/lesson.service";
import {ActivatedRoute} from "@angular/router";
import {Lesson} from "../../../models/lesson";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-lesson-editor',
  templateUrl: './lesson-editor.component.html',
  styleUrl: './lesson-editor.component.css'
})
export class LessonEditorComponent implements OnInit{

  public id:number=0;
  public category:string="";
  public duration:number=0;
  public employeeIndex:number=0;
  public employees: Employee[]=[];
  constructor(private employeeService:EmployeeService, private lessonService: LessonService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadEmployees();
    this.loadLesson();
  }

  loadLesson(){
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.lessonService.searchLesson(id).subscribe(
        (response: Lesson) => {
          this.id=response.id;
          this.duration=response.duration;
          this.category=response.category;
        },
        (error: HttpErrorResponse) => {
          alert(error.status+" Oops");
        });
    });
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe((result: any[]) => {
      this.employees = result;
    });
  }

  public saveLessons() {
    const lesson:Lesson={
      id:this.id,
      duration:this.duration,
      category:this.category,
      empPassNum:this.employees[this.employeeIndex].passportNumber,
      employee:this.employees[this.employeeIndex]
    }
    this.lessonService.updateLesson(lesson).subscribe((response) => {
      console.log(response);
    });
  }

}
