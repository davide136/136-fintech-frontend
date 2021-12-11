import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AppointmentsRoutingModule } from './appointments-routing.module';
import { AppointmentsComponent } from './appointments.component';
import { MaterialModule } from '../../../shared/material/material.module';
import { AppointmentsFormComponent } from './appointments-form/appointments-form.component';
import { MapComponent } from '../../../shared/layout/map/map.component';


@NgModule({
  declarations: [
    AppointmentsComponent,
    AppointmentsFormComponent,
    MapComponent,
  ],
  providers: [DatePipe],
  imports: [
    CommonModule,
    MaterialModule,
    AppointmentsRoutingModule
  ]
})
export class AppointmentsModule { }
