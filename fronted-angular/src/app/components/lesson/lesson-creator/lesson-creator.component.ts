import {Component, OnInit} from '@angular/core';
import {EmployeeService} from "../../../services/employee.service";
import {Router} from "@angular/router";
import {Employee} from "../../../models/employee";
import {LessonService} from "../../../services/lesson.service";
import {Lesson} from "../../../models/lesson";


@Component({
  selector: 'app-lesson-creator',
  templateUrl: './lesson-creator.component.html',
  styleUrl: './lesson-creator.component.css'
})
export class LessonCreatorComponent implements OnInit {

  public id: number = 0;
  public category: string = "";
  public duration: number = 0;
  public employeeIndex: number = 0;
  public employees: Employee[] = [];

  constructor(private employeeService: EmployeeService, private lessonService: LessonService, private router: Router) {
  }

  ngOnInit() {
    this.loadEmployees();
    if (this.isAvailable()) {
      alert('You cant create lesson without employees. Create them');
      this.router.navigate(['/lessons']);
    }
    this.lessonService.getAll().subscribe((result: any[]) => {
      let uniqueId = 1;
      const idSet = new Set(result.map(item => item.id));
      while (idSet.has(uniqueId)) {
        uniqueId++;
      }
      this.id = uniqueId;
    });
  }

  isAvailable() {
    return (this.employees && this.employees.length > 0);
  }

  loadEmployees() {
    this.employeeService.getAll().subscribe((result: any[]) => {
      this.employees = result;
    });
  }

  public saveLessons() {
    const lesson: Lesson = {
      id: this.id,
      duration: this.duration,
      category: this.category,
      empPassNum: this.employees[this.employeeIndex].passportNumber,
      employee: this.employees[this.employeeIndex]
    }
    this.lessonService.create(lesson).subscribe((response) => {
      console.log(response);
    });
  }
}
