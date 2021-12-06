import { Component, OnInit } from '@angular/core';
import { Contact } from '../../../shared/models/contact';
import { v4 as uuidv4 } from 'uuid';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'ac-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  contacts: Contact[] = [{ iban: 'adshoiuh12352345', name: 'Mario', surname: 'Verdi', _id: uuidv4() }, { iban: 'adshoiuh12352345', name: 'Mario', surname: 'Rossi', _id: uuidv4() }, { iban: 'adshoiuh12352345', name: 'Mario', surname: 'Biondi', _id: uuidv4() },];
  selectedContact: Contact | null = null;
  modalView: 'contact-list' | 'contact-form' = 'contact-list';

  constructor(private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
  }

  saveHandler(contact: any) {
    if (contact) {
      if (contact._id)//EDITING
        this.contacts = this.contacts.map(c => { return c._id === contact._id ? contact : c; });
      else // ADDING
        this.contacts = [...this.contacts, { ...contact, _id: uuidv4() }]
    }
    this._snackBar.open('Lista contatti aggiornata', 'Nascondi');
    this.modalView = 'contact-list';
    this.selectedContact = null;
  }
 
  fillWithSelected(_id: string) {
    
  }

  addContact() {
    this.selectedContact = null;
    this.modalView = 'contact-form';
  }

  editHandler(contact: Contact) {
    this.selectedContact = contact;
    this.modalView = 'contact-form';
  }

  deleteHandler(_id: string) {
    this.contacts = this.contacts.filter(c => c._id != _id);
  }

  cancelHandler() {
    this.modalView = 'contact-list';
    this.selectedContact = null;
  }
}
