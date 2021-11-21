import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'home', loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule) },
  { path: 'card', loadChildren: () => import('./features/card/card.module').then(m => m.CardModule) },
  { path: 'sign-in', loadChildren: () => import('./features/login/sign-in/sign-in.module').then(m => m.SignInModule) },
  { path: 'register', loadChildren: () => import('./features/login/register/register.module').then(m => m.RegisterModule) },
  { path: '', pathMatch: 'full', redirectTo: 'register' },
  { path: 'transfer', loadChildren: () => import('./features/transfer/transfer.module').then(m => m.TransferModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
