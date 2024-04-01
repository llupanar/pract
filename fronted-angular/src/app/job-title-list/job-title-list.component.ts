import {Component, OnInit} from '@angular/core';
import {JobTitle} from "../job-title";
import {JobTitleService} from "../job-title.service";

@Component({
  selector: 'app-job-title-list',
  templateUrl: './job-title-list.component.html',
  styleUrl: './job-title-list.component.css'
})
export class JobTitleListComponent implements OnInit{

  jobTitles: JobTitle[]=[];
  constructor(private jobTitleService: JobTitleService) {
  }

  ngOnInit() {
  this.getJobTitles()
  }

  private getJobTitles(){
      this.jobTitleService.getJobTitleList().subscribe(data=>{
      this.jobTitles=data;
    })
  }
}
