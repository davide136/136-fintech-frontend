import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '../../../shared/models/location';
import { v4 as uuidv4 } from 'uuid';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'ac-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  locations: Location[] = [{ address: 'Via Padova 15', coords: [45.40797, 11.88586], name: 'Sede centrale', _id: uuidv4(), email: 'info@fintech.com', phone: '+39 049 950 0000' }, { address: 'Via Padova 15/B', coords: [45.49597, 11.81346], name: 'Sede operativa', _id: uuidv4(), email: 'info@fintech.it', phone: '+39 049 538 0000' }];
  selectedLocation: Location | null = null;

  constructor() { }

  ngOnInit(): void {
  }

  newAppointment(loc: Location) {
    this.selectedLocation = null;
    this.selectedLocation = loc;
    this.drawer.toggle(true);
  }
}
