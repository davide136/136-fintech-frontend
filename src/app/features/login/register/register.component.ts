import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import Validation from '../../../shared/utils/validation';

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
    password: ['', [Validators.required, Validators.minLength(3)]],
    password2: ['', [Validators.required ]],
  },
    {
      validators: [Validation.match('password', 'password2')]
    }
  );
  visibility = false;
  submitted = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    console.log(this.form.value);
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
}
