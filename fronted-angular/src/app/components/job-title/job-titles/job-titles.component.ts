import {Component, OnInit} from '@angular/core';
import {JobTitle} from "../../../models/job_title";
import {JobTitleService} from "../../../services/job-title.service";
import {HttpErrorResponse} from "@angular/common/http";
import {JobTitleFilterPipe} from "./job-title-filter.pipe";

@Component({
  selector: 'app-job-titles',
  templateUrl: './job-titles.component.html',
  providers: [JobTitleFilterPipe]
})
export class JobTitlesComponent implements OnInit {
  public jobTitles: JobTitle[] = [];
  public jobTitleSearch: JobTitle = {position: "", salary: 0, bonus: false};
  public searchText: string = "";

  constructor(private jobTitleService: JobTitleService) {
  }

  ngOnInit() {
    this.getJobTitles();
  }

  public getJobTitles(): void {
    this.jobTitleService.getAll().subscribe(
      (response: JobTitle[]) => {
        this.jobTitles = response;
        console.log(this.jobTitles);
      },
      (error: HttpErrorResponse) => {
        alert(error.status);
      }
    );
  }

  public deleteJobTitleItem(jobTitle: JobTitle): void {
    const confirmation = confirm('Are you sure?');
    if (confirmation) {
      this.jobTitleService.delete(jobTitle.position).subscribe(
        () => {
          const index = this.jobTitles.indexOf(jobTitle);
          if (index !== -1) {
            this.jobTitles.splice(index, 1);
          }
          this.getJobTitles();
        },
        (error: HttpErrorResponse) => {
          alert('Delete title failed ' + error.message);
        }
      );
    }
  }

  public searchJobTitle(): void {
    this.jobTitleService.getById(this.searchText).subscribe(
      (response: JobTitle) => {
        this.jobTitleSearch = response;
        console.log(this.jobTitles);
      },
      (error: HttpErrorResponse) => {
        alert(error.status);
      }
    );
  }
}
