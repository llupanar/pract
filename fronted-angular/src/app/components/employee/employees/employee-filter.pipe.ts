import { Pipe, PipeTransform } from '@angular/core';
import {Employee} from "../../../models/employee";

@Pipe({
  name: 'employeeFilter'
})
export class EmployeeFilterPipe implements PipeTransform {

  transform(list: Employee[], searchText: string): any {
    if (!list)
      return [];
    if (!searchText)
      return list;
    searchText = searchText.toLocaleLowerCase();

    list = list.filter(s => {
      return s.passportNumber.toLocaleLowerCase().includes(searchText);
    });
    return list;

  }

}
