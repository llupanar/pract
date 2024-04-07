import { Pipe, PipeTransform } from '@angular/core';
import {DatePipe} from "@angular/common";

@Pipe({
  name: 'formatDataTime'
})
export class VisitsPipe implements PipeTransform {

  transform(value: any): any {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(value, 'yyyy-MM-dd HH:mm:ss');
  }
}
