import { RegisterComponent } from './views/register.component';
import { SignInComponent } from './views/sign-in.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'signin', component: SignInComponent},
  {path: 'register', component: RegisterComponent},
  {path: '', component: SignInComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
