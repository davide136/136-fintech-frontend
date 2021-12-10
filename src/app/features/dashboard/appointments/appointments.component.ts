import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '../../../shared/models/location';
import { v4 as uuidv4 } from 'uuid';
import { MatDrawer } from '@angular/material/sidenav';
import { AppointmentsService } from '../../../api/appointments.service';

@Component({
  selector: 'ac-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  locations: Location[] = [];
  selectedLocation: Location | null = null;

  constructor(
    private appointmentsService: AppointmentsService
  ) { }

  ngOnInit(): void {
    this.appointmentsService
      .getLocations()
      .subscribe(res => this.locations = res);
  }

  newAppointment(loc: Location) {
    this.selectedLocation = null;
    this.selectedLocation = loc;
    this.drawer.toggle(true);
  }

  openedChangeEvent(open: boolean) {
    if (!open)
      this.selectedLocation = null;
  }
}
