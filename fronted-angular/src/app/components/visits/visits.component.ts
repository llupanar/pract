import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {VisitService} from "../../services/visit.service";
import {Visit} from "../../models/visit";
import {VisitsFilterPipe} from "./visits-filter.pipe";

@Component({
  selector: 'app-visits',
  templateUrl: './visits.component.html',
  styleUrl: './visits.component.css',
  providers:[VisitsFilterPipe]
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
  public searchText:string='';


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
  public deleteVisitItem(visit: Visit): void {
    const confirmation = confirm('Are you sure?');
    if (confirmation) {
      console.log(visit.id);
      this.visitService.deleteVisit(visit.id).subscribe(
        () => {
          const index = this.visits.indexOf(visit);
          if (index !== -1) {
            this.visits.splice(index, 1);
          }
          this.getVisits();
        },
        (error: HttpErrorResponse) => {
          alert('Delete visit failed: ' + error.message);
        }
      );
    }
  }


}
