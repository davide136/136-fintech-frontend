import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginFormComponent} from "./login-form.component";
import {MaterialModule} from "../material/material.module";


@NgModule({
  declarations: [LoginFormComponent],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class LoginFormModule { }
