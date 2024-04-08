import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JobTitlesComponent } from './components/job-title/job-titles/job-titles.component';
import {HttpClientModule} from "@angular/common/http";
import { SwgroupsComponent } from './components/swgroup/swgroups/swgroups.component';
import { ClientsComponent } from './components/client/clients/clients.component';
import { EmployeesComponent } from './components/employee/employees/employees.component';
import { VisitsComponent } from './components/visit/visits/visits.component';
import { SchedulesComponent } from './components/schedule/schedules/schedules.component';
import { PoolSubscriptionsComponent } from './components/pool-subscription/pool-subscriptions/pool-subscriptions.component';
import { LessonsComponent } from './components/lesson/lessons/lessons.component';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";
import { ClientFilterPipe } from './components/client/clients/client-filter.pipe';
import { EmployeeFilterPipe } from './components/employee/employees/employee-filter.pipe';
import { JobTitleFilterPipe } from './components/job-title/job-titles/job-title-filter.pipe';
import { SubscriptionFilterPipe } from './components/pool-subscription/pool-subscriptions/subscription-filter.pipe';
import { ScheduleFilterPipe } from './components/schedule/schedules/schedule-filter.pipe';
import { VisitsFilterPipe } from './components/visit/visits/visits-filter.pipe';
import { SwgroupFilterPipe } from './components/swgroup/swgroups/swgroup-filter.pipe';
import { LessonFilterPipe } from './components/lesson/lessons/lesson-filter.pipe';
import { ClientCreatorComponent } from './components/client/client-creator/client-creator.component';
import { JobTitleEditorComponent } from './components/job-title/job-title-editor/job-title-editor.component';
import { JobTitleCreatorComponent } from './components/job-title/job-title-creator/job-title-creator.component';
import { SwgroupCreatorComponent } from './components/swgroup/swgroup-creator/swgroup-creator.component';
import { VisitsPipe } from './components/visit/visits/visits.pipe';
import { EmployeeCreatorComponent } from './components/employee/employee-creator/employee-creator.component';
import {ClientEditorComponent} from "./components/client/client-editor/client-editor.component";
import { SwgroupEditorComponent } from './components/swgroup/swgroup-editor/swgroup-editor.component';
import { EmployeeEditorComponent } from './components/employee/employee-editor/employee-editor.component';
import {LessonCreatorComponent} from "./components/lesson/lesson-creator/lesson-creator.component";
import {LessonEditorComponent} from "./components/lesson/lesson-editor/lesson-editor.component";
import {ScheduleCreatorComponent} from "./components/schedule/schedule-creator/schedule-creator.component";
import {ScheduleEditorComponent} from "./components/schedule/schedule-editor/schedule-editor.component";

const routes: Routes = [
  { path: 'job-titles', component: JobTitlesComponent },
  { path: 'clients', component: ClientsComponent },
  { path: 'employees', component: EmployeesComponent },
  { path: 'visits', component: VisitsComponent },
  { path: 'pool-subscriptions', component: PoolSubscriptionsComponent },
  { path: 'schedules', component: SchedulesComponent },
  { path: 'lessons', component: LessonsComponent },
  { path: 'groups', component: SwgroupsComponent },
  {path:'add-client',component:ClientCreatorComponent},
  {path:'edit-client/:id',component:ClientEditorComponent},
  {path:'add-job-title',component:JobTitleCreatorComponent},
  {path:'edit-job-title/:id',component:JobTitleEditorComponent},
  {path:'add-employee',component:EmployeeCreatorComponent},
  {path:'edit-employee/:id',component:EmployeeEditorComponent},
  {path:'add-group',component:SwgroupCreatorComponent},
  {path:'edit-group/:id',component:SwgroupEditorComponent},
  {path:'add-lesson',component:LessonCreatorComponent},
  {path:'edit-lesson/:id',component:LessonEditorComponent},
  {path:'add-schedule',component:ScheduleCreatorComponent},
  {path:'edit-schedule/:id',component:ScheduleEditorComponent},
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
    VisitsPipe,
    SwgroupFilterPipe,
    LessonFilterPipe,
    ClientCreatorComponent,
    ClientEditorComponent,
    JobTitleEditorComponent,
    JobTitleCreatorComponent,
    SwgroupCreatorComponent,
    EmployeeCreatorComponent,
    SwgroupEditorComponent,
    EmployeeEditorComponent,
    LessonCreatorComponent,
    LessonEditorComponent,
    ScheduleCreatorComponent,
    ScheduleEditorComponent
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
