import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {Schedule} from "../../../models/schedule";
import {ScheduleService} from "../../../services/schedule.service";
import {ScheduleFilterPipe} from "./schedule-filter.pipe";

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrl: './schedules.component.css',
  providers:[ScheduleFilterPipe]
})
export class SchedulesComponent implements OnInit{
  public schedules: Schedule[]=[];

  public searchText:string='';


  constructor(private scheduleService: ScheduleService){}

  ngOnInit() {
    this.getSchedules();
  }

  public getSchedules(): void {
    this.scheduleService.getSchedules().subscribe(
      (response: Schedule[]) => {
        this.schedules = response;
        console.log(this.schedules);
      },
      (error: HttpErrorResponse) => {
        alert(error.status);
      }
    );
  }
  public deleteScheduleItem(schedule: Schedule): void {
    const confirmation = confirm('Are you sure?');
    if (confirmation) {
      this.scheduleService.deleteSchedule(schedule.id).subscribe(
        () => {
          const index = this.schedules.indexOf(schedule);
          if (index !== -1) {
            this.schedules.splice(index, 1);
          }
          this.getSchedules();
        },
        (error: HttpErrorResponse) => {
          alert('Delete schedule failed ' + error.message);
        }
      );
    }
  }

}
