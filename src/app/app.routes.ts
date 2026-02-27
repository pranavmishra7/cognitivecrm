import { Routes } from '@angular/router';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WORKFLOW_ROUTES } from './workflow.routes';
export const routes: Routes = [
  { path: 'form-builder', component: FormBuilderComponent },
  { path: 'form/:formName', component: DynamicFormComponent },
  {path:'register', loadComponent: () => import('./client-register/client-register.component').then(m => m.ClientRegisterComponent)}, 
   { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path:'dashboard', component: DashboardComponent},
   {
    path: 'workflow',
    loadChildren: () =>
    import('./workflow.routes')
      .then(m => m.WORKFLOW_ROUTES)
  }
];
