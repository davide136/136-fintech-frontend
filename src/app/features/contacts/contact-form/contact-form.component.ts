import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ResetForm } from '../../../shared/utils/reset-form';

@Component({
  selector: 'ac-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  @ViewChild('formRef', { static: true }) formRef!: NgForm;
  @Output() submit = new EventEmitter();

  form = this.fb.group({
    //form properties
    name: ['', [Validators.required]],
    surname: ['', [Validators.required]],
    iban: ['', [
      Validators.required,
      Validators.minLength(34),
      Validators.maxLength(34),
    ]],
  });

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
  }

  onCancel() {
    new ResetForm(this.form, this.formRef);
  }

  onSubmit() {
    this.submit.emit(this.form.value);
  }
}
