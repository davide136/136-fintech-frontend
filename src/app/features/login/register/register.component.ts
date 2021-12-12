import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../api/auth.service';
import { equalFieldsValidator } from '../../../shared/validators/equal-fields.validator';

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
    password: ['', [
      Validators.required,
      Validators.minLength(3)]
    ],
    password2: ['', [Validators.required ]],
  },
    {
      validators: [equalFieldsValidator('password', 'password2')]
    }
  );
  visibility = false;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.register({
      email: this.form.get('email')!.value,
      name: this.form.get('name')!.value,
      password: this.form.get('password')!.value,
      surname: this.form.get('surname')!.value,
    }).subscribe(res => {
      if (res) {
        this.submitted = true;
        this.router.navigate(['/login'])
      }
    })
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
}
