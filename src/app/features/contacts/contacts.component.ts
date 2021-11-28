import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contact } from '../../shared/models/contact';
import { ContactFormComponent } from './contact-form/contact-form.component';

@Component({
  selector: 'ac-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  contacts: Contact[] = [{ iban: 'adshoiuh12352345', name: 'Mario', surname: 'Verdi', _id: Math.random() + '' }, { iban: 'adshoiuh12352345', name: 'Mario', surname: 'Rossi', _id: Math.random() + '' }, { iban: 'adshoiuh12352345', name: 'Mario', surname: 'Biondi', _id: Math.random() + '' },];

  constructor(
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
  }

  addContact() {
    const dialogRef = this.dialog.open(ContactFormComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.contacts = [...this.contacts, { ...result, _id: Math.random()+'' }]
    });
  }

  fillWithSelected(_id: string) {
    
  }

  editHandler(contact: Contact) {

  }

  deleteHandler(_id: string) {

  }

}
