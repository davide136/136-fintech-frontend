import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Location } from '../../../shared/models/location';
import { MatDrawer } from '@angular/material/sidenav';
import { AppointmentsService } from '../../../api/appointments.service';
import { DayWithSlot, DayWithSlots } from '../../../shared/models/days-with-slot';
import { AppointmentsFormComponent } from './appointments-form/appointments-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

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

  locations$ = new BehaviorSubject<Location[]>([]);
  selectedLocationId$ = new BehaviorSubject<string>('');
  selectedLocation$ = combineLatest([this.locations$, this.selectedLocationId$]).pipe(
    map(([locations, id]) => {
      return locations.find(loc => loc._id === id)
    })
  );
  selectedLocationSlots$ = new BehaviorSubject<DayWithSlots[]>([]);

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
      .subscribe(res => this.locations$.next(res));
  }

  newAppointment(loc: Location) {
    this.appointmentsService.getSlots(loc._id)
      .subscribe(slots => {
        this.selectedLocationSlots$.next(slots);
        this.selectedLocationId$.next(loc._id);
        this.drawer.toggle(true);
      })
  }

  openedChangeEvent(open: boolean) {
    if (!open) {
      this.selectedLocationId$.next('');
      this.selectedLocationSlots$.next([]);
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
