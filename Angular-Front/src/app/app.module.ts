import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Router, Routes} from '@angular/router'
import {FormsModule} from '@angular/forms'


import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomePageContentComponent } from './components/home-page-content/home-page-content.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { Ng2CarouselamosModule } from 'ng2-carouselamos';
import { CarouselComponent } from './components/carousel/carousel.component';
import { AuthService } from './service/auth.service'

const  applicationRouters:Routes = [
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'',component:HomePageContentComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomePageContentComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    CarouselComponent,
  ],
  imports: [
    BrowserModule,
    Ng2CarouselamosModule,
    FormsModule,
    RouterModule.forRoot(applicationRouters)
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
