import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Contact } from '../../../../shared/models/contact';
import { ResetForm } from '../../../../shared/utils/reset-form';

@Component({
  selector: 'ac-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnChanges {
  @ViewChild('formRef', { static: true }) formRef!: NgForm;

  @Output() submit = new EventEmitter<Contact>();
  @Output() cancel = new EventEmitter();

  @Input() selectedContact: Contact | null = null;

  form = this.fb.group({
    //hidden ID
    _id: [''],
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
  ) { }

  ngOnChanges(): void {
    if (this.selectedContact) {
      this.form.patchValue({
        _id: this.selectedContact._id,
        name: this.selectedContact.name,
        surname: this.selectedContact.surname,
        iban: this.selectedContact.iban,
      });
    }
  }

  onCancel() {
    this.cancel.emit();
  }

  onSubmit() {
    this.submit.emit(this.form.value);
  }
}
