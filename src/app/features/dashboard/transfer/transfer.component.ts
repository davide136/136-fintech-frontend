import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialog } from '../../../shared/layout/dialogs/confirm-dialog/confirm-dialog.component';
import { ContactsComponent } from '../contacts/contacts.component';
import { Card } from '../../../shared/models/card';
import { ResetForm } from '../../../shared/utils/reset-form';

@Component({
  selector: 'ac-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {
  @ViewChild('formRef', { static: true }) formRef!: NgForm;

  cards: Card[] = [{ "_id": "dd157a93-e632-490a-8a88-531dd61933f4", "number": "0000 0000 0000 0000", "ownerId": "et45er5e6fba", "owner": "Mario Rossi", "type": "visa", "amount": 15000 }, { "_id": "418a2814-c6da-4e5f-8c9a-bfe0b69649a6", "number": "1111 1111 1111 1111", "ownerId": "et45er5e6fba", "owner": "Mario Rossi", "type": "mastercard", "amount": 500 }, { "_id": "970a55ff-70ba-4c22-b3aa-f4fd8d51ccfb", "number": "2222 2222 2222 2222", "ownerId": "et45er5e6fba", "owner": "Mario Rossi", "type": "visa", "amount": 250000 }];
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
    this.confirm();
  }

  confirm() {
    const dialogRef = this.dialog.open(ConfirmDialog);
    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.transfer()
    });
  }

  contacts() {
    const dialogRef = this.dialog.open(ContactsComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.transfer()
    });
  }

  transfer() {
    console.log('transferring', this.form.value)
    new ResetForm(this.form, this.formRef);
    this._snackBar.open('Trasferiti dei soldi.', 'Chiudi');
  }
}
