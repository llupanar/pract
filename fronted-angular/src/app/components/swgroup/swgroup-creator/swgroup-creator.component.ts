import { Component } from '@angular/core';
import {SwgroupService} from "../../../services/swgroup.service";
import {SwGroup} from "../../../models/swgroup";

@Component({
  selector: 'app-swgroup-creator',
  templateUrl: './swgroup-creator.component.html',
  styleUrl: './swgroup-creator.component.css'
})
export class SwgroupCreatorComponent {

  public swgroup:SwGroup={id:0,level:0,memberCount:0,ageCategory:""};
  constructor(private swGroupService: SwgroupService) {}

  public swveSwGroup(){
    this.swGroupService.getSwGroups().subscribe((result: any[]) => {
      let uniqueId = 1;
      const idSet = new Set(result.map(item => item.id));
      while (idSet.has(uniqueId)) {
        uniqueId++;
      }
      this.swgroup.id = uniqueId;
    });
    this.swGroupService.addSwGroup(this.swgroup).subscribe((response) => {
      console.log(response);
    });
  }
}
