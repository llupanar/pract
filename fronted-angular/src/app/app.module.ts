import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JobTitlesComponent } from './components/job-titles/job-titles.component';
import {HttpClientModule} from "@angular/common/http";
import { SwgroupsComponent } from './components/swgroups/swgroups.component';
import { ClientsComponent } from './components/clients/clients.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { VisitsComponent } from './components/visits/visits.component';
import { SchedulesComponent } from './components/schedules/schedules.component';
import { PoolSubscriptionsComponent } from './components/pool-subscriptions/pool-subscriptions.component';
import { LessonsComponent } from './components/lessons/lessons.component';
import {RouterModule, Routes} from "@angular/router";
const routes: Routes = [
  { path: 'job-titles', component: JobTitlesComponent },
  { path: 'clients', component: ClientsComponent },
  { path: 'employees', component: EmployeesComponent },
  { path: 'visits', component: VisitsComponent },
  { path: 'pool-subscriptions', component: PoolSubscriptionsComponent },
  { path: 'schedules', component: SchedulesComponent },
  { path: 'lessons', component: LessonsComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    JobTitlesComponent,
    SwgroupsComponent,
    ClientsComponent,
    EmployeesComponent,
    VisitsComponent,
    SchedulesComponent,
    PoolSubscriptionsComponent,
    LessonsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
