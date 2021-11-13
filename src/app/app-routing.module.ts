import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'home', loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule) },
  { path: 'card-list', loadChildren: () => import('./features/card-list/card-list.module').then(m => m.CardListModule) },
  { path: 'sign-in', loadChildren: () => import('./features/login/sign-in/sign-in.module').then(m => m.SignInModule) },
  { path: 'register', loadChildren: () => import('./features/login/register/register.module').then(m => m.RegisterModule) },
  { path: '', pathMatch: 'full', redirectTo: 'register' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
