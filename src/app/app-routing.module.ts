import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    children: [
      {path: 'signin', loadChildren: () => import('./views/login/sign-in/sign-in.module').then(m => m.SignInModule) },
      {path: 'register', loadChildren: () => import('./views/login/register/register.module').then(m => m.RegisterModule) },
      {path: '', redirectTo: 'login', pathMatch: 'full'}
    ]
  },
  {path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
