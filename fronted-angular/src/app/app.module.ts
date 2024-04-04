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
import {FormsModule} from "@angular/forms";
import { ClientFilterPipe } from './components/clients/client-filter.pipe';
import { EmployeeFilterPipe } from './components/employees/employee-filter.pipe';
import { JobTitleFilterPipe } from './components/job-titles/job-title-filter.pipe';
import { SubscriptionFilterPipe } from './components/pool-subscriptions/subscription-filter.pipe';
import { ScheduleFilterPipe } from './components/schedules/schedule-filter.pipe';
import { VisitsFilterPipe } from './components/visits/visits-filter.pipe';
import { SwgroupFilterPipe } from './components/swgroups/swgroup-filter.pipe';
import { LessonFilterPipe } from './components/lessons/lesson-filter.pipe';
import { ClientCreatorComponent } from './components/client-creator/client-creator.component';
import { ClientEditorComponent } from './components/client-editor/client-editor.component';
const routes: Routes = [
  { path: 'job-titles', component: JobTitlesComponent },
  { path: 'clients', component: ClientsComponent },
  { path: 'employees', component: EmployeesComponent },
  { path: 'visits', component: VisitsComponent },
  { path: 'pool-subscriptions', component: PoolSubscriptionsComponent },
  { path: 'schedules', component: SchedulesComponent },
  { path: 'lessons', component: LessonsComponent },
  { path: 'swgroup', component: SwgroupsComponent },
  {path:'add-client',component:ClientCreatorComponent},
  {path:'edit-client/:id',component:ClientEditorComponent}

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
    ClientFilterPipe,
    EmployeeFilterPipe,
    JobTitleFilterPipe,
    SubscriptionFilterPipe,
    ScheduleFilterPipe,
    VisitsFilterPipe,
    SwgroupFilterPipe,
    LessonFilterPipe,
    ClientCreatorComponent,
    ClientEditorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
