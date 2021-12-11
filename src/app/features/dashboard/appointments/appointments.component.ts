import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Location } from '../../../shared/models/location';
import { MatDrawer } from '@angular/material/sidenav';
import { AppointmentsService } from '../../../api/appointments.service';
import { DayWithSlot, DayWithSlots } from '../../../shared/models/days-with-slot';
import { AppointmentsFormComponent } from './appointments-form/appointments-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'ac-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {

  @ViewChild('drawer', { static: true })
  drawer!: MatDrawer;
  @ViewChildren(AppointmentsFormComponent)
  formComponent!: QueryList<AppointmentsFormComponent>;

  locations: Location[] = [];
  selectedLocation: Location | null = null;
  selectedLocationSlots: DayWithSlots[] = [];

  constructor(
    public appointmentsService: AppointmentsService,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getLocations();
  }

  getLocations() {
    this.appointmentsService
      .getLocations()
      .subscribe(res => this.locations = res);
  }

  newAppointment(loc: Location) {
    this.appointmentsService.getSlots(loc._id)
      .subscribe(slots => {
        this.selectedLocationSlots = slots;
        this.selectedLocation = loc;
        this.drawer.toggle(true);
      })
  }

  openedChangeEvent(open: boolean) {
    if (!open) {
      this.selectedLocation = null;
      this.selectedLocationSlots = [];
      this.formComponent.forEach(c => c.reset());
    }
  }


  submitHandle(result: DayWithSlot | null) {
    if (result)
      this.appointmentsService.schedule(result)
        .subscribe(res => {
          if (res) this._snackBar.open(
            "Fissato appuntamento per il giorno "
            + result.day + " alle "
            + result.slot + ":00.",
            'Nascondi');
        });    
  }
}
