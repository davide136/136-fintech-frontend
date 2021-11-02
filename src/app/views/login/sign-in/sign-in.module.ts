import { AppRoutingModule } from './../../../app-routing.module';
import { SignInComponent } from './sign-in.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    
  ],
  declarations: [SignInComponent]
})
export class SignInModule { }
