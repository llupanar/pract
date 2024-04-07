import { Pipe, PipeTransform } from '@angular/core';
import {Schedule} from "../../../models/schedule";

@Pipe({
  name: 'scheduleFilter'
})
export class ScheduleFilterPipe implements PipeTransform {

  transform(items: Schedule[], searchText: any): any[] {
    if (!searchText) {
      return items;
    }
    const searchNumber = Number(searchText);

    return items.filter(item => {
      return item.id === searchNumber;
    });
    return items;
  }

}
