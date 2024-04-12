import {Component, OnInit} from '@angular/core';
import {JobTitle} from "../../../models/job_title";
import {ActivatedRoute} from '@angular/router';
import {JobTitleService} from "../../../services/job-title.service";
import {HttpErrorResponse} from "@angular/common/http";


@Component({
  selector: 'app-job-title-editor',
  templateUrl: './job-title-editor.component.html',
  styleUrl: './job-title-editor.component.css'
})
export class JobTitleEditorComponent implements OnInit {

  public jobTitle: JobTitle = {position: "", salary: 0, bonus: false};

  constructor(private jobTitleService: JobTitleService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.loadJobTitle();
  }

  loadJobTitle() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.jobTitleService.getById(id).subscribe(
        (response: JobTitle) => {
          this.jobTitle = response;
        },
        (error: HttpErrorResponse) => {
          alert(error.status + " Oops");
        });
    });
  }

  saveJobTitle() {
    this.jobTitleService.update(this.jobTitle.position, this.jobTitle).subscribe((response) => {
      console.log(response);
    });
  }
}
