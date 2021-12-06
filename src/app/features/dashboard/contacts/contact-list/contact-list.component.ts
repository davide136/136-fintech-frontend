import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core'
import { Contact } from '../../../../shared/models/contact';

@Component({
  selector: 'ac-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit, OnDestroy {
  @Input() contacts: Contact[] = [];

  @Output() done = new EventEmitter<string>();
  @Output() edit = new EventEmitter<Contact>();
  @Output() delete = new EventEmitter<string>();

  filter: string | null = null;

  constructor() { }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }

  doneEmit(_id: string) {
    this.done.emit(_id);
  }
  editEmit(contact: Contact) {
    this.edit.emit(contact);
  }
  deleteEmit(_id: string) {
    this.delete.emit(_id);
  }
}
