import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './shared/material/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NavbarComponent } from './features/navbar/navbar.component';
import { ContainerComponent } from './shared/layout/container/container.component';
import { ConfirmDialog } from './shared/layout/dialogs/confirm-dialog/confirm-dialog.component';
import { ContactsModal } from './shared/layout/modals/contacts/contacts.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ContainerComponent,
    ConfirmDialog,
    ContactsModal
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
