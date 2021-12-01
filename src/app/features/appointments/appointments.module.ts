import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentsRoutingModule } from './appointments-routing.module';
import { AppointmentsComponent } from './appointments.component';
import { MaterialModule } from '../../shared/material/material.module';
import { AppointementsFormComponent } from './appointements-form/appointements-form.component';
import { MapComponent } from '../../shared/layout/map/map.component';


@NgModule({
  declarations: [
    AppointmentsComponent,
    AppointementsFormComponent,
    MapComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AppointmentsRoutingModule
  ]
})
export class AppointmentsModule { }
