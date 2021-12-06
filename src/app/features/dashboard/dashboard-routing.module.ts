import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  { path: 'card', loadChildren: () => import('./card/card.module').then(m => m.CardModule) },
  { path: 'transfer', loadChildren: () => import('./transfer/transfer.module').then(m => m.TransferModule) },
  { path: 'contacts', loadChildren: () => import('./contacts/contacts.module').then(m => m.ContactsModule) },
  { path: 'appointments', loadChildren: () => import('./appointments/appointments.module').then(m => m.AppointmentsModule) },
  { path: '', pathMatch: 'full', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
