import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactsComponent } from './contacts.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { MaterialModule } from '../../shared/material/material.module';
import { FormsModule } from '@angular/forms';
import { ContactsFilterPipe } from '../../shared/pipes/filter-contacts.pipe';
import { ContactFormComponent } from './contact-form/contact-form.component';

@NgModule({
  declarations: [
    ContactsComponent,
    ContactListComponent,
    ContactsFilterPipe,
    ContactFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ContactsRoutingModule,
    MaterialModule,
  ]
})
export class ContactsModule { }
