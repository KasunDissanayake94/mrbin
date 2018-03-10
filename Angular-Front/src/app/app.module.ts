import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Router, Routes} from '@angular/router'
import {FormsModule} from '@angular/forms'


import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomePageContentComponent } from './components/home-page-content/home-page-content.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
//import { RegisterComponent } from './components/register/register.component';
import { Ng2CarouselamosModule } from 'ng2-carouselamos';
import { CarouselComponent } from './components/carousel/carousel.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';

import { environment } from '../environments/environment';
import {AngularFireAuthModule} from "angularfire2/auth";
import {AuthService} from "./service/auth.service";
import { UserloggedinnavbarComponent } from './components/userloggedinnavbar/userloggedinnavbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LbdModule } from './components/lbd/lbd.module';
import { TablesComponent } from './components/tables/tables.component';
import { UserComponent } from './components/user/user.component';
import { FlashMessagesModule } from 'angular2-flash-messages';








const  applicationRouters:Routes = [
  {path:'',component:HomePageContentComponent},
  {path:'login',component:LoginComponent},
  {path:'userhome',component:DashboardComponent},
  {path:'tables',component:TablesComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'user',component:UserComponent},

];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomePageContentComponent,
    FooterComponent,
    LoginComponent,
    CarouselComponent,
    UserloggedinnavbarComponent,
    DashboardComponent,
    SidebarComponent,
    TablesComponent,
    UserComponent




  ],
  imports: [
    BrowserModule,
    Ng2CarouselamosModule,
    FormsModule,
    RouterModule.forRoot(applicationRouters),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserModule,
    FormsModule,
    RouterModule,
    LbdModule,
    FlashMessagesModule.forRoot()

  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
