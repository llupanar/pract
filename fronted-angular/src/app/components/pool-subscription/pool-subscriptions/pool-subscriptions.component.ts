import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {PoolSubscription} from "../../../models/pool_subscription";
import {PoolSubscriptionService} from "../../../services/pool-subscription.service";
import {SubscriptionFilterPipe} from "./subscription-filter.pipe";

@Component({
  selector: 'app-pool-subscriptions',
  templateUrl: './pool-subscriptions.component.html',
  styleUrl: './pool-subscriptions.component.css',
  providers:[SubscriptionFilterPipe]
})
export class PoolSubscriptionsComponent implements OnInit{
  public poolSubscriptions: PoolSubscription[]=[];

  public searchText:string='';


  constructor(private poolSubscriptionService: PoolSubscriptionService){}

  ngOnInit() {
    this.getPoolSubscriptions();
  }

  public getPoolSubscriptions(): void {
    this.poolSubscriptionService.getPoolSubscriptions().subscribe(
      (response: PoolSubscription[]) => {
        this.poolSubscriptions = response;
        console.log(this.poolSubscriptions);
      },
      (error: HttpErrorResponse) => {
        alert(error.status);
      }
    );
  }
  public deletePoolSubscriptionItem(poolSubscription: PoolSubscription): void {
    const confirmation = confirm('Вы уверены, что хотите удалить эту подписку на бассейн?');
    if (confirmation) {
      this.poolSubscriptionService.deletePoolSubscription(poolSubscription.id).subscribe(
        () => {
          const index = this.poolSubscriptions.indexOf(poolSubscription);
          if (index !== -1) {
            this.poolSubscriptions.splice(index, 1);
          }
          this.getPoolSubscriptions();
        },
        (error: HttpErrorResponse) => {
          alert('Delete subscription failed ' + error.message);
        }
      );
    }
  }
}
