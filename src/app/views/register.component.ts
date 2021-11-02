import { Component } from '@angular/core';
import { Form, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'ac-sign-in',
  template: `
  <div>Enter your details</div>
  <form>
  <mat-form-field class="full-width" appearance="fill">
      <mat-label>Name</mat-label>
      <input type="name" matInput [formControl]="nameFormControl">
      <mat-icon *ngIf="nameFormControl.value" matSuffix mat-icon-button aria-label="Clear" (click)="clearHandler(nameFormControl)">close</mat-icon>
      <mat-error *ngIf="nameFormControl.hasError('required')">
        Name is <strong>required</strong>
      </mat-error>
  </mat-form-field>
  <mat-form-field class="full-width" appearance="fill">
      <mat-label>Surname</mat-label>
      <input type="surname" matInput [formControl]="surnameFormControl">
      <mat-icon *ngIf="surnameFormControl.value" matSuffix mat-icon-button aria-label="Clear" (click)="clearHandler(surnameFormControl)">close</mat-icon>
      <mat-error *ngIf="surnameFormControl.hasError('required')">
      Surname is <strong>required</strong>
      </mat-error>
  </mat-form-field>
  <mat-form-field class="full-width" appearance="fill">
      <mat-label>Email</mat-label>
      <input type="email" matInput [formControl]="emailFormControl" placeholder="Ex. mario@example.com">
      <mat-icon *ngIf="emailFormControl.value" matSuffix mat-icon-button aria-label="Clear" (click)="clearHandler(emailFormControl)">close</mat-icon>
      <mat-error *ngIf="emailFormControl.hasError('email') && !emailFormControl.hasError('required')">
        Please enter a valid email address
      </mat-error>
      <mat-error *ngIf="emailFormControl.hasError('required')">
        Email is <strong>required</strong>
      </mat-error>
  </mat-form-field>
  <mat-form-field class="full-width" appearance="fill">
    <mat-label>Password</mat-label>
      <input [type]='hide_pw ? "password" : "text"' matInput [formControl]="passwordFormControl" placeholder="Password">
      <mat-icon matSuffix aria-label="Show/Hide" (click)="hide_pw=!hide_pw">
        {{hide_pw ? 'visibility' : 'visibility_off'}}
      </mat-icon>
        <mat-error *ngIf="passwordFormControl.hasError('required')">
          Password is <strong>required</strong>
        </mat-error>
  </mat-form-field>

  <mat-form-field class="full-width" appearance="fill">
    <mat-label>Repeat password</mat-label>
      <input [type]='hide_pw ? "password" : "text"' matInput [formControl]="password2FormControl" placeholder="Repeat password">
      <mat-icon matSuffix aria-label="Show/Hide" (click)="hide_pw=!hide_pw">
        {{hide_pw ? 'visibility' : 'visibility_off'}}
      </mat-icon>
        <mat-error *ngIf="password2FormControl.hasError('childrenNotEqual')">
          Passwords <strong>do not match</strong>
        </mat-error>
        <mat-error *ngIf="password2FormControl.hasError('required')">
          Please, confirm your password.
        </mat-error>
  </mat-form-field>
  <button mat-flat-button color="primary" type="submit" [disabled]="!formIsValid()" class="full-width-button">
    Register
  </button>
</form>
  `,
  styles: [`
  div{
    margin-bottom: 1rem;
  }
  `]
})
export class RegisterComponent {
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

  hide_pw = true;

  constructor() { }

  clearHandler(formControl: FormControl){
    formControl.setValue('');
  }

  formIsValid(){
    if(this.emailFormControl.valid
      && this.passwordFormControl.valid
      && this.nameFormControl.valid)
      return true;
    return false;
  }

  passwordsMatch: ValidatorFn = () => {
    const isValid = this.passwordFormControl.value === this.password2FormControl.value;
    return isValid ? null : { childrenNotEqual: true };
  }

}
