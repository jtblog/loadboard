import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule, NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule, FormsModule,
    NgbModule, NgbPaginationModule, NgbAlertModule,
    RouterModule.forRoot([
      {
        path : "admin",
        component : AdminComponent 
      },
      {
        path : "home",
        component : HomeComponent 
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
