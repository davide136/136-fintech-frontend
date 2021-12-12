import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../api/auth.service';

@Component({
  selector: 'ac-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  form = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(3)]],
  });
  visibility = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.login(
      this.form.get('email')!.value,
      this.form.get('password')!.value
    ).subscribe(res => {
      if (res) {
        this.router.navigate(['/dashboard']);        
      }
    })
  }
}

