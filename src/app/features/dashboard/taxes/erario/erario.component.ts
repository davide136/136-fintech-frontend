import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'ac-erario',
  templateUrl: './erario.component.html',
  styleUrls: ['./erario.component.scss']
})
export class ErarioComponent implements OnInit {
  @ViewChild('formRef', { static: true }) formRef!: NgForm;

  form = this.fb.group({
    cod_tributo: ['', [Validators.required]],
    ref_year: ['', [Validators.required]],
    debt: ['', [Validators.required]],
    credit: ['', [Validators.required]],
  },
  );

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

}
