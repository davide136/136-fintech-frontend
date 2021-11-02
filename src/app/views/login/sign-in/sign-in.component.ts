import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'ac-sign-in',
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.scss"]
})
export class SignInComponent {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required
  ]);
  hide_pw = true;

  constructor() { }

  clearHandler(formControl: FormControl){
    formControl.setValue('');
  }

  formIsValid(){
    if(this.emailFormControl.valid
      && this.passwordFormControl.valid)
      return true;
    return false;
  }
}
