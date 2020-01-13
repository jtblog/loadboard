import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule, NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { environment } from '../environments/environment'
import { AngularFireModule } from '@angular/fire'
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth'
import { AngularFireDatabaseModule } from '@angular/fire/database'
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import * as firebase from 'firebase/app';

import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { AdminGuard } from './core/admin.guard';
import { AuthService } from './core/auth.service';
import { SetbetComponent } from './setbet/setbet.component';
import { DlDateTimeDateModule, DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';
import { TopupComponent } from './topup/topup.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    LoginComponent,
    RegisterComponent,
    SetbetComponent,
    TopupComponent
  ],
  imports: [
    BrowserModule, FormsModule,
    DlDateTimeDateModule,
    DlDateTimePickerModule,
    NgbModule, NgbPaginationModule, NgbAlertModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    RouterModule.forRoot([
      {
        path : "admin",
        component : AdminComponent,
        canActivate: [AdminGuard]
      },
      {
        path : "home",
        component : HomeComponent 
      },
      {
        path : "signin",
        component : LoginComponent 
      },
      {
        path : "signup",
        component : RegisterComponent 
      },
      {
        path : "",
        component : HomeComponent 
      }
    ])
  ],
  entryComponents: [SetbetComponent, TopupComponent],
  providers: [AuthService, AdminGuard, { provide: 'Window',  useValue: window }],
  bootstrap: [AppComponent]
})
export class AppModule { }
