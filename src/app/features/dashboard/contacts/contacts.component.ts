import { Component, OnInit, Output } from '@angular/core';
import { Contact } from '../../../shared/models/contact';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContactsService } from '../../../api/contacts.service';
import { MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'ac-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  contacts$ = new BehaviorSubject<Contact[]>([]);
  selectedContact$ = new BehaviorSubject<Contact | null>(null);
  modalView: 'contact-list' | 'contact-form' = 'contact-list';

  constructor(
    private _snackBar: MatSnackBar,
    public matDialogRef: MatDialogRef<ContactsComponent>,
    private contactsService: ContactsService
  ) { }

  ngOnInit(): void {
    this.contactsService.getAll().subscribe(
      dto => this.contacts$.next(dto)
    );
  }

  saveHandler(dto: Partial<Contact>) {
    if (dto && dto._id != '') { // EDITING
      this.contactsService.update(dto)!.subscribe(res => {
        console.log(res)
        this.contacts$.next(
          this.contacts$.value.map(c => {
            return c._id === res._id ? res : c;
          })
        )
        
        this._snackBar.open('Lista contatti aggiornata', 'Nascondi');
        this.end();
      })
    }
    else { // ADDING
      this.contactsService.add(dto)?.subscribe(res => {
        console.log(res)
        this.contacts$.next([...this.contacts$.value, res])
        this._snackBar.open('Lista contatti aggiornata', 'Nascondi');
        this.end();
      })
    }
  }
 
  fillWithSelected(contact: Contact) {
    this.matDialogRef.close(contact);
  }

  addContact() {
    this.selectedContact$.next(null);
    this.modalView = 'contact-form';
  }

  editHandler(contact: Contact) {
    this.selectedContact$.next(contact);
    this.modalView = 'contact-form';
  }

  deleteHandler(_id: string) {
    this.contactsService.delete(_id).subscribe(
      res => {
        if(res)
          this.contacts$.next(
            this.contacts$.value.filter(
              c => c._id != _id
            )
          )
      }
    )
  }

  cancelHandler() {
    this.end();
  }

  end() {
    this.modalView = 'contact-list';
    this.selectedContact$.next(null);
  }
}
