import { Pipe, PipeTransform } from '@angular/core';
import {SwGroup} from "../../models/swgroup";

@Pipe({
  name: 'swgroupFilter'
})
export class SwgroupFilterPipe implements PipeTransform {

  transform(items: SwGroup[], searchText: any): any[] {
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
