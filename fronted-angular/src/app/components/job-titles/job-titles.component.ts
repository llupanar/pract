import {Component, OnInit} from '@angular/core';
import {JobTitle} from "../../models/job_title";
import {JobTitleService} from "../../services/job-title.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-job-titles',
  templateUrl: './job-titles.component.html',
  styleUrl: './job-titles.component.css'
})
export class JobTitlesComponent implements OnInit{
  public jobTitles: JobTitle[]=[];
  public editJobTitle: JobTitle={position: "",salary:0,bonus:false};
  public deleteJobTitle: JobTitle={position: "",salary:0,bonus:false};

  constructor(private jobTitleService: JobTitleService){}

  ngOnInit() {
    this.getJobTitles();
  }

  public getJobTitles(): void {
    this.jobTitleService.getJobTitles().subscribe(
      (response: JobTitle[]) => {
        this.jobTitles = response;
        console.log(this.jobTitles);
      },
      (error: HttpErrorResponse) => {
        alert(error.status);
      }
    );
  }
}
