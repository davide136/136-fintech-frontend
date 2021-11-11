import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'ac-register',
  templateUrl: './register.component.html',
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent {

  hide_pw = true;

  constructor() { }

  nameFormControl = new FormControl('', [
    Validators.required
  ]);
  surnameFormControl = new FormControl('', [
    Validators.required
  ]);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required
  ]);
  password2FormControl = new FormControl('', [
    Validators.required
  ]);

  clearHandler(formControl: FormControl){
    formControl.setValue('');
  }

  formIsValid(){
    if(this.emailFormControl.valid
      && this.passwordFormControl.valid
      && this.password2FormControl.valid
      && this.nameFormControl.valid
      && this.surnameFormControl.valid
      && this.passwordMatch())
      return true;
    return false;
  }

  passwordMatch(){
    return ( this.passwordFormControl.value === this.password2FormControl.value ) && this.password2FormControl.dirty}

}
