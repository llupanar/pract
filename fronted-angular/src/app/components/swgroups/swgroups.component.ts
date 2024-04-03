import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {SwGroup} from "../../models/swgroup";
import {SwgroupService} from "../../services/swgroup.service";
import {SwgroupFilterPipe} from "./swgroup-filter.pipe";

@Component({
  selector: 'app-swgroups',
  templateUrl: './swgroups.component.html',
  styleUrl: './swgroups.component.css',
  providers:[SwgroupFilterPipe]
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
  public searchText:string='';

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

  public deleteSwGroupItem(swGroup: SwGroup): void {
    const confirmation = confirm('Are you sure?');
    if (confirmation) {
      this.swgroupService.deleteSwGroup(swGroup.id).subscribe(
        () => {
          const index = this.swGroups.indexOf(swGroup);
          if (index !== -1) {
            this.swGroups.splice(index, 1);
          }
          this.getSwGroups();
        },
        (error: HttpErrorResponse) => {
          alert('Delete sw-group failed ' + error.message);
        }
      );
    }
  }

}
