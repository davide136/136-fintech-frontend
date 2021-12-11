import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from '../../../../shared/layout/dialogs/confirm-dialog/confirm-dialog.component';
import { DayWithSlot, Hour, DayWithSlots } from '../../../../shared/models/days-with-slot';
import { dateToString } from '../../../../shared/utils/dateToString';
import { ResetForm } from '../../../../shared/utils/reset-form';
import { Location } from '../../../../shared/models/location';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ac-appointments-form',
  templateUrl: './appointments-form.component.html',
  styleUrls: ['./appointments-form.component.scss']
})
export class AppointmentsFormComponent {
  @ViewChild('formRef', { static: true }) formRef!: NgForm;

  @Input() location: Location | null = null;
  @Input() selectedLocationSlots: DayWithSlots[] = [];

  @Output() submit = new EventEmitter<DayWithSlot | null>();

  
  selectedDate: DayWithSlots | null = null;
  availableDays: string[] = [];
  form = this.fb.group({
    date: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    public datepipe: DatePipe,
  ) { }

  ngOnChanges() {
    this.selectedLocationSlots.forEach(slot => {
      this.availableDays.push(slot.day)
    })
  }

  reset(): void {
    this.availableDays = [];
    new ResetForm(this.form, this.formRef);
    this.selectedDate = null;
    this.location = null;
    this.selectedLocationSlots = [];
  }

  dateFilter = (d: Date | null): boolean => {
    return this.availableDays
      .find(element =>
        element == this.datepipe.transform(d, 'M/d/yyyy'))
      != undefined;
  };

  onDateSelected(dateInput: any) {
    var slots: Hour[] = [];
    this.selectedLocationSlots
      .forEach(slot => {
        var formattedInput = this.datepipe.transform(
          new Date(dateInput.value), 'M/d/yyyy');
        if (slot.day == formattedInput)
          slots = slot.slots;
      });
    this.selectedDate = {
      day: dateInput.value,
      slots: slots
    }
  }

  hourSelected(hour: Hour) {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '25rem',
      data: {
        title: "Confermi l'appuntamento?",
        message: "L'appuntamento sarà fissato per il giorno " +
          dateToString(this.form.get('date')!.value) +
          " alle " + hour + ":00.",
      },
    });

    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        var result: DayWithSlot | null = null;
        result = {
          day: dateToString(this.form.get('date')!.value),
          slot: hour
        };
        this.submit.emit(result);
      }
    });
  }
}
