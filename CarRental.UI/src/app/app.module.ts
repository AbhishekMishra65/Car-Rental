import { NgModule, OnDestroy } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { CreateCarComponent } from './features/car/create-car/create-car.component';
import { FormsModule } from '@angular/forms';
import { GetallcarsAdminComponent } from './features/car/getallcars-admin/getallcars-admin.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { AuthService } from './features/auth/services/auth.service';
import { HomeComponent } from './features/public/home/home.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CreateAgreementComponent } from './features/agreement/create-agreement/create-agreement.component';
import { UserAgreementsComponent } from './features/agreement/user-agreements/user-agreements.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { AllAgreementsComponent } from './features/auth/all-agreements/all-agreements.component';
import { EditCarComponent } from './features/car/edit-car/edit-car.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    CreateCarComponent,
    GetallcarsAdminComponent,
    HomeComponent,
    CreateAgreementComponent,
    UserAgreementsComponent,
    AllAgreementsComponent,
    EditCarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    ToastrModule.forRoot(),
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule{
  // constructor(private authService:AuthService){
  // }

  // ngOnDestroy(): void {
  //    this.authService.logout();
  // }
}
