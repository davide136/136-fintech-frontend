import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'ac-inps',
  templateUrl: './inps.component.html',
  styleUrls: ['./inps.component.scss']
})
export class InpsComponent implements OnInit {
  @ViewChild('formRef', { static: true }) formRef!: NgForm;

  form = this.fb.group({
    cod_sede: ['', [Validators.required]],
    tax_subject: ['', [Validators.required]],
    inps_code: ['', [Validators.required]],
    from: ['', [Validators.required]],
    to: ['', [Validators.required]],
    debit: ['', [Validators.required]],
    credit: ['', [Validators.required]],
  },
  );

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

}
