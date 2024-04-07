import { Pipe, PipeTransform } from '@angular/core';
import {Visit} from "../../../models/visit";

@Pipe({
  name: 'visitsFilter'
})
export class VisitsFilterPipe implements PipeTransform {

  transform(items: Visit[], searchText: any): any[] {
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
