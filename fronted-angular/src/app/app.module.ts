import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JobTitlesComponent } from './components/job-titles/job-titles.component';
import {HttpClientModule} from "@angular/common/http";
import { SwgroupsComponent } from './components/swgroups/swgroups.component';
import { ClientsComponent } from './components/clients/clients.component';
@NgModule({
  declarations: [
    AppComponent,
    JobTitlesComponent,
    SwgroupsComponent,
    ClientsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
