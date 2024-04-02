import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {SwGroup} from "../../models/swgroup";
import {SwgroupService} from "../../services/swgroup.service";

@Component({
  selector: 'app-swgroups',
  templateUrl: './swgroups.component.html',
  styleUrl: './swgroups.component.css'
})
export class SwgroupsComponent implements OnInit{
  public swGroups: SwGroup[]=[];
  public editSwGroup: SwGroup={
      id: 0,
      level: 0,
      memberCount: 0,
      ageCategory:""
  };
  public deleteSwGroup: SwGroup={
      id: 0,
      level: 0,
      memberCount: 0,
      ageCategory:""
  };

  constructor(private swgroupService: SwgroupService){}

  ngOnInit() {
    this.getSwGroups();
  }

  public getSwGroups(): void {
    this.swgroupService.getSwGroups().subscribe(
      (response: SwGroup[]) => {
        this.swGroups = response;
        console.log(this.swGroups);
      },
      (error: HttpErrorResponse) => {
        alert(error.status);
      }
    );
  }
}
