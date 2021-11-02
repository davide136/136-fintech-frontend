import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'ac-sign-in',
  template: `
  <div>Enter your details</div>
  <form>
  <mat-form-field class="full-width" appearance="fill">
      <mat-label>Email</mat-label>
      <input name="email" matInput [formControl]="emailFormControl" placeholder="Ex. mario@example.com">
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
      <input [name]='hide_pw ? "password" : "text"' matInput [formControl]="passwordFormControl" placeholder="Password">
      <mat-icon matSuffix aria-label="Show/Hide" (click)="hide_pw=!hide_pw">
        {{hide_pw ? 'visibility' : 'visibility_off'}}
      </mat-icon>
        <mat-error *ngIf="passwordFormControl.hasError('required')">
          Password is <strong>required</strong>
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
