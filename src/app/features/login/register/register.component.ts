import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'ac-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form = this.fb.group({
    name: ['', [Validators.required]],
    surname: ['', [Validators.required]],
    email: ['', [Validators.required]],
    passwords: this.fb.group({
      password: ['', [Validators.required, Validators.minLength(3)]],
      password2: ['', [Validators.required, passwordValidator ]],
    })
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.form.value);
 }
}

function passwordValidator(control: AbstractControl): ValidationErrors | null {
  console.log(control)
  if (control && control.parent &&
    control.parent.get('password')!.value != control.parent.get('password2')?.value)
    return {
      err: 'Le password inserite non corrispondono!'
    }
  return null;
}
