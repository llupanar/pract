import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {SwGroup} from "../../../models/swgroup";
import {SwgroupService} from "../../../services/swgroup.service";
import {SwgroupFilterPipe} from "./swgroup-filter.pipe";

@Component({
  selector: 'app-swgroups',
  templateUrl: './swgroups.component.html',
  providers:[SwgroupFilterPipe]
})
export class SwgroupsComponent implements OnInit{
  public swGroups: SwGroup[]=[];

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
