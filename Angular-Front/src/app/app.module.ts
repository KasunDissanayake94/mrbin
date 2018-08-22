import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Router, Routes} from '@angular/router'
import {FormsModule} from '@angular/forms'
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomePageContentComponent } from './components/home-page-content/home-page-content.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { Ng2CarouselamosModule } from 'ng2-carouselamos';
import { CarouselComponent } from './components/carousel/carousel.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';
import { environment } from '../environments/environment';
import { AngularFireAuthModule} from "angularfire2/auth";
import { AuthService} from "./service/auth.service";
import { AuthGuard } from "./service/auth.guard"
import { AuthGuarduser } from "./service/auth.guarduser"
import { HttpModule } from '@angular/http';

//components
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LbdModule } from './components/lbd/lbd.module';
import { TablesComponent } from './components/tables/tables.component';
import { UserComponent } from './components/user/user.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { DriversComponent } from './components/drivers/drivers.component';
import {FilledbinsComponent} from "./components/filledbins/filledbins.component";
import {ReportsComponent} from "./components/reports/reports.component";
import { CustomerFeedbackReportComponent } from './components/customer-feedback-report/customer-feedback-report.component';
//import component lib for charts
import { ChartsModule } from 'ng2-charts';
import { LinechartComponent } from './components/charts/linechart/linechart.component';
import { BarchartComponent } from './components/charts/barchart/barchart.component';
import { DoughnutchartComponent } from './components/charts/doughnutchart/doughnutchart.component';
//Import Google Maps
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { GoogleMapComponent } from './components/google-map/google-map.component';
import { GeoService } from './service/geo.service';
import { ErrorComponent } from './components/error/error.component';

//added for live search
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { GarbagetrucksComponent } from './components/garbagetrucks/garbagetrucks.component';
//upload image
import { ImageUploadModule } from "angular2-image-upload";
import { BarchartYrcolComponent } from './components/charts/barchart-yrcol/barchart-yrcol.component';
import { NgxGaugeModule } from 'ngx-gauge';
import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';



const  applicationRouters:Routes = [
  //add all components links here
  {path:'',component:HomePageContentComponent,canActivate:[AuthGuarduser]},
  {path:'login',component:LoginComponent},
  {path:'userhome',component:DashboardComponent,canActivate: [AuthGuard]},
  {path:'tables',component:DashboardComponent,canActivate: [AuthGuard]},
  {path:'dashboard',component:DashboardComponent,canActivate: [AuthGuard]},
  {path:'user',component:UserComponent,canActivate: [AuthGuard]},
  {path:'about',component:AboutComponent},
  {path:'contact',component:ContactComponent},
  {path:'bins',component:FilledbinsComponent,canActivate: [AuthGuard]},
  {path:'drivers',component:DriversComponent,canActivate: [AuthGuard]},
  {path:'maps',component:GoogleMapComponent,canActivate: [AuthGuard]},
  {path:'customer-feedback-report',component:CustomerFeedbackReportComponent},
  {path:'error',component:ErrorComponent},
  {path:'garbagetruck',component:GarbagetrucksComponent},
  {path:'reports',component:ReportsComponent},


];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomePageContentComponent,
    FooterComponent,
    LoginComponent,
    CarouselComponent,
    DashboardComponent,
    SidebarComponent,
    TablesComponent,
    UserComponent,
    AboutComponent,
    ContactComponent,
    DriversComponent,
    CustomerFeedbackReportComponent,
    DriversComponent,
    FilledbinsComponent,
    LinechartComponent,
    BarchartComponent,
    DoughnutchartComponent,
    GoogleMapComponent,
    ErrorComponent,
    GarbagetrucksComponent,
    ReportsComponent,
    BarchartYrcolComponent,

  ],
  imports: [
    BrowserModule,
    Ng2CarouselamosModule,
    Ng2SearchPipeModule,
    FormsModule,
    Ng4GeoautocompleteModule.forRoot(),
    RouterModule.forRoot(applicationRouters),
    AngularFireModule.initializeApp(environment.firebase),
    ImageUploadModule.forRoot(),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserModule,
    FormsModule,
    RouterModule,
    NgxGaugeModule,
    LbdModule,
    HttpModule,
    FlashMessagesModule.forRoot(),
    ChartsModule,
    AgmCoreModule.forRoot({
      apiKey: environment.firebase.googleMapsKey
    }),
    AgmDirectionModule


  ],
  providers: [AuthService, GeoService,AuthGuard,AuthGuarduser],
  bootstrap: [AppComponent]
})
export class AppModule { }
