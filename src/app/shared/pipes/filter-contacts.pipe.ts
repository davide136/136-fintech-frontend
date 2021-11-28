import { Pipe, PipeTransform } from "@angular/core";
import { Contact } from "../models/contact";

@Pipe({ name: 'contactsFilter' })
export class ContactsFilterPipe implements PipeTransform {
  transform(contacts: Contact[], filter: string | null): Contact[] {
    if (!filter)
      return contacts;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()) ||
      contact.surname.toLowerCase().includes(filter.toLowerCase()) ||
      contact.iban.toLowerCase().includes(filter.toLowerCase()) ||
      contact._id.toLowerCase().includes(filter.toLowerCase())
      )
  }
}
