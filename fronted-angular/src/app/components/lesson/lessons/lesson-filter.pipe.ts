import { Pipe, PipeTransform } from '@angular/core';
import {Lesson} from "../../../models/lesson";

@Pipe({
  name: 'lessonFilter'
})
export class LessonFilterPipe implements PipeTransform {

  transform(items: Lesson[], searchText: any): any[] {
    if (!searchText) {
      return items;
    }
    const searchNumber = Number(searchText);

    return items.filter(item => {
      return item.duration === searchNumber;
    });
    return items;
  }

}
