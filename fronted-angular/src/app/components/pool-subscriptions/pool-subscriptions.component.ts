import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {PoolSubscription} from "../../models/pool_subscription";
import {PoolSubscriptionService} from "../../services/pool-subscription.service";

@Component({
  selector: 'app-pool-subscriptions',
  templateUrl: './pool-subscriptions.component.html',
  styleUrl: './pool-subscriptions.component.css'
})
export class PoolSubscriptionsComponent implements OnInit{
  public poolSubscriptions: PoolSubscription[]=[];
  public editPoolSubscription: PoolSubscription={
    id: 0,
    type:"",
    cost:0,
    endDate: "",
    swgroup_id:0
  };
  public deletePoolSubscription: PoolSubscription={
    id: 0,
    type:"",
    cost:0,
    endDate: "",
    swgroup_id:0
  };

  constructor(private scheduleService: PoolSubscriptionService){}

  ngOnInit() {
    this.getPoolSubscriptions();
  }

  public getPoolSubscriptions(): void {
    this.scheduleService.getPoolSubscriptions().subscribe(
      (response: PoolSubscription[]) => {
        this.poolSubscriptions = response;
        console.log(this.poolSubscriptions);
      },
      (error: HttpErrorResponse) => {
        alert(error.status);
      }
    );
  }
}
