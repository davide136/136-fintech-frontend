import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'ac-contribuente',
  templateUrl: './contribuente.component.html',
  styleUrls: ['./contribuente.component.scss']
})
export class ContribuenteComponent implements OnInit {
  @ViewChild('formRef', { static: true }) formRef!: NgForm;

  form = this.fb.group({
    cf: ['', [Validators.required]],
    surname: ['', [Validators.required]],
    name: ['', [Validators.required]],
    birthday: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    county: ['', [Validators.required]],
    city: ['', [Validators.required]],
  },
  );

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.form.value)
  }


}
