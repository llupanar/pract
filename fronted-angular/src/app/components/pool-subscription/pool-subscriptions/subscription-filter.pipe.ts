import { Pipe, PipeTransform } from '@angular/core';
import {PoolSubscription} from "../../../models/pool_subscription";

@Pipe({
  name: 'subscriptionFilter'
})
export class SubscriptionFilterPipe implements PipeTransform {

  transform(items: PoolSubscription[], searchText: any): any[] {
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
