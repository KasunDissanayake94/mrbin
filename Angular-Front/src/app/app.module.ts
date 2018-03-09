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
import {AuthService} from "./services/auth.service";
import { UserloggedinnavbarComponent } from './components/userloggedinnavbar/userloggedinnavbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LbdModule } from './components/lbd/lbd.module';
import {SidebarModule} from "./components/sidebar/sidebar.module";
import {TablesComponent} from "./components/tables/tables.component";
import {NotificationsComponent} from "./components/notifications/notifications.component";
import {MapsComponent} from "./components/maps/maps.component";
import {IconsComponent} from "./components/icons/icons.component";
import {TypographyComponent} from "./components/typography/typography.component";
import {UpgradeComponent} from "./components/upgrade/upgrade.component";
import { UserComponent } from './components/user/user.component';






const  applicationRouters:Routes = [
  {path:'login',component:LoginComponent},
  {path:'userhome',component:UserloggedinnavbarComponent},
  {path:'',component:HomePageContentComponent},
  { path: 'userhome/dashboard',      component: DashboardComponent },
  { path: 'userhome/user',      component: UserComponent },
  { path: 'userhome/table',          component: TablesComponent },
  { path: 'userhome/typography',     component: TypographyComponent },
  { path: 'userhome/icons',          component: IconsComponent },
  { path: 'userhome/maps',           component: MapsComponent },
  { path: 'userhome/notifications',  component: NotificationsComponent },
  { path: 'userhome/upgrade',        component: UpgradeComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomePageContentComponent,
    FooterComponent,
    LoginComponent,
    CarouselComponent,
    UserComponent,
    UserloggedinnavbarComponent,
    DashboardComponent,
    TablesComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,


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
    SidebarModule,
    RouterModule,
    LbdModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
