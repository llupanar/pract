import { Pipe, PipeTransform } from '@angular/core';
import {Client} from "../../../models/client";

@Pipe({
  name: 'clientFilterPipe'
})
export class ClientFilterPipe implements PipeTransform {

  transform(list: Client[], searchText: string): any {
    if (!list)
      return [];
    if (!searchText)
      return list;
    searchText = searchText.toLocaleLowerCase();

    list = list.filter(s => {
      return s.fullName.toLocaleLowerCase().includes(searchText);
    });
    return list;

  }
}
