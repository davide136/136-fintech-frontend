import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialog } from '../../../shared/layout/dialogs/confirm-dialog/confirm-dialog.component';
import { ContactsComponent } from '../contacts/contacts.component';
import { Card } from '../../../shared/models/card';
import { ResetForm } from '../../../shared/utils/reset-form';
import { Contact } from '../../../shared/models/contact';
import { CardsService } from '../../../api/cards.service';
import { CurrencyPipe } from '@angular/common';
import { TransferService } from '../../../api/transfer.service';

@Component({
  selector: 'ac-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {
  @ViewChild('formRef', { static: true }) formRef!: NgForm;

  cards: Card[] = [];
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
    cardId: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private currencyPipe: CurrencyPipe,
    private cardsService: CardsService,
    private transferService: TransferService,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.cardsService.getAll().subscribe(
      res => this.cards = res
    );
  }

  onCancel() {
    new ResetForm(this.form, this.formRef);
  }

  onSubmit() {
    this.confirm();
  }

  confirm() {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      data: {
        title: 'Confermare l\'operazione',
        message: 'Hai richiesto un trasferimento di '
          + this.currencyPipe.transform(this.form.get('amount')!.value, 'EUR')
          + ' verso ' + this.form.get('name')!.value + ' '
          + this.form.get('surname')!.value + '.',
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.transfer()
    });
  }

  contacts() {
    const dialogRef = this.dialog.open(ContactsComponent);
    dialogRef.afterClosed().subscribe(contact => {
      if (contact)
        this.fillWithSelectedContact(contact as Contact)
    });
  }

  fillWithSelectedContact(contact: Contact) {
    this.form.patchValue({
      ...contact
    });
  }

  transfer() {
    console.log('transferring log', this.form.value);
    this.transferService.transfer(this.form.value)
      .subscribe(res => {
        if (res) {
          new ResetForm(this.form, this.formRef);
          this._snackBar.open('Il trasferimento è stato eseguito con successo.', 'Chiudi');
        }
        else {
          this._snackBar.open('Il trasferimento è fallito.', 'Chiudi');
        }
      }
    );
  }
}
