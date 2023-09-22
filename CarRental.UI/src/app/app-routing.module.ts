import { NgModule, createComponent } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { CreateCarComponent } from './features/car/create-car/create-car.component';
import { GetallcarsAdminComponent } from './features/car/getallcars-admin/getallcars-admin.component';
import { authGuard } from './features/auth/guards/auth.guard';
import { HomeComponent } from './features/public/home/home.component';
import { CreateAgreementComponent } from './features/agreement/create-agreement/create-agreement.component';
import { UserAgreementsComponent } from './features/agreement/user-agreements/user-agreements.component';
import { AllAgreementsComponent } from './features/auth/all-agreements/all-agreements.component';
import { EditCarComponent } from './features/car/edit-car/edit-car.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'rentcar/:VehicleId',component:CreateAgreementComponent},
  {path:'youragreements/:userId',component:UserAgreementsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path:'admin/cars' , component: GetallcarsAdminComponent,canActivate: [authGuard]},
  {path: 'admin/cars/create', component: CreateCarComponent,canActivate: [authGuard]},
  {path: 'admin/agreements', component: AllAgreementsComponent,canActivate: [authGuard]},
  {path : 'admin/editcar/:vehicleId', component: EditCarComponent,canActivate: [authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
