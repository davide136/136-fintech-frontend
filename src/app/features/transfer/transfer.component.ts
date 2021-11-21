import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { ResetForm } from '../../shared/utils/reset-form';

@Component({
  selector: 'ac-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {
  @ViewChild('formRef', { static: true }) formRef!: NgForm;
  form = this.fb.group({
    //form properties
    name: ['', [Validators.required]],
    surname: ['', [Validators.required]],
    iban: ['', [
      Validators.required,
      Validators.minLength(34),
      Validators.maxLength(34),
    ]],
    amount: ['', [
      Validators.required,
      Validators.minLength(1),
    ]],
    card: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onCancel() {
    new ResetForm(this.form, this.formRef);
  }
  onSubmit() {

  }
}
