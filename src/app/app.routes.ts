import { Routes } from '@angular/router';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  { path: 'form-builder', component: FormBuilderComponent },
  { path: 'form/:formName', component: DynamicFormComponent },
  {path:'register', loadComponent: () => import('./client-register/client-register.component').then(m => m.ClientRegisterComponent)}, 
   { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path:'dashboard', component: DashboardComponent},
  {path:'life-insurance', loadComponent: () => import('./imfapp/life-insurance/life-insurance.component').then(m => m.LifeInsuranceComponent)}
];
