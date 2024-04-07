import { Pipe, PipeTransform } from '@angular/core';
import {Client} from "../../../models/client";
import {JobTitle} from "../../../models/job_title";

@Pipe({
  name: 'jobTitleFilter'
})
export class JobTitleFilterPipe implements PipeTransform {

  transform(list: JobTitle[], searchText: string): any {
    if (!list)
      return [];
    if (!searchText)
      return list;
    searchText = searchText.toLocaleLowerCase();
    list = list.filter(s => {
      return s.position.toLocaleLowerCase().includes(searchText);
    });
    return list;
  }
}
