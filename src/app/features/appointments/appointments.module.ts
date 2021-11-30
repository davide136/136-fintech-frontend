import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentsRoutingModule } from './appointments-routing.module';
import { AppointmentsComponent } from './appointments.component';
import { MaterialModule } from '../../shared/material/material.module';


@NgModule({
  declarations: [
    AppointmentsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AppointmentsRoutingModule
  ]
})
export class AppointmentsModule { }
