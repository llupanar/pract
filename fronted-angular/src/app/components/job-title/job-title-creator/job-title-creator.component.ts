import {Component} from '@angular/core';
import {JobTitle} from "../../../models/job_title";
import {JobTitleService} from "../../../services/job-title.service";

@Component({
  selector: 'app-job-title-creator',
  templateUrl: './job-title-creator.component.html',
  styleUrl: './job-title-creator.component.css'
})
export class JobTitleCreatorComponent {

  public jobTitle: JobTitle = {position: "", salary: 0, bonus: false};

  constructor(private jobTitleService: JobTitleService) {
  }

  public saveJobTitle() {
    this.jobTitleService.create(this.jobTitle).subscribe((response) => {
      console.log(response);
    });
  }

}
