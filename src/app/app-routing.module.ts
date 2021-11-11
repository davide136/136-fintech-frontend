import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  { path: 'settings', loadChildren: () => import('./features/settings/settings.module').then(m => m.SettingsModule) },
  { path: 'sign-in', loadChildren: () => import('./features/login/sign-in/sign-in.module').then(m => m.SignInModule) },
  { path: 'register', loadChildren: () => import('./features/login/register/register.module').then(m => m.RegisterModule) },
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
