import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {VisitService} from "../../services/visit.service";
import {Visit} from "../../models/visit";

@Component({
  selector: 'app-visits',
  templateUrl: './visits.component.html',
  styleUrl: './visits.component.css'
})
export class VisitsComponent implements OnInit{
  public visits: Visit[]=[];
  public editVisit: Visit={
    id: 0,
    dateTime:"",
    attended: false,
    client_passport_number: "",
    employee_passport_number:"",
    lesson_id:0
  };
  public deleteVisit: Visit={
    id: 0,
    dateTime:"",
    attended: false,
    client_passport_number: "",
    employee_passport_number:"",
    lesson_id:0
  };

  constructor(private visitService: VisitService){}

  ngOnInit() {
    this.getVisits();
  }

  public getVisits(): void {
    this.visitService.getVisits().subscribe(
      (response: Visit[]) => {
        this.visits = response;
        console.log(this.visits);
      },
      (error: HttpErrorResponse) => {
        alert(error.status);
      }
    );
  }


}
