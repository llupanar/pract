import {Component, OnInit} from '@angular/core';
import {SwGroup} from "../../../models/swgroup";
import {SwgroupService} from "../../../services/swgroup.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-swgroup-editor',
  templateUrl: './swgroup-editor.component.html',
  styleUrl: './swgroup-editor.component.css'
})
export class SwgroupEditorComponent implements OnInit{

  public swgroup:SwGroup={id:0,level:0,memberCount:0,ageCategory:""};
  constructor(private swGroupService: SwgroupService, private route: ActivatedRoute) {}
  ngOnInit() {
    this.loadSwGroup();
  }
  loadSwGroup(){
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.swGroupService.searchSwGroup(id).subscribe(
        (response: SwGroup) => {
          this.swgroup = response;
        },
        (error: HttpErrorResponse) => {
          alert(error.status+" Oops");
        });
    });
  }
  public saveSwGroup(){
    this.swGroupService.addSwGroup(this.swgroup).subscribe((response) => {
      console.log(response);
    });
  }
}
