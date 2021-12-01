import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from '../../../shared/layout/dialogs/confirm-dialog/confirm-dialog.component';
import { DayWithSlots } from '../../../shared/models/days-with-slots';
import { DayWithSlot } from '../../../shared/models/days-with-slot';
import { dateToString } from '../../../shared/utils/dateToString';
import { ResetForm } from '../../../shared/utils/reset-form';
import { Location } from '../../../shared/models/location';

@Component({
  selector: 'ac-appointements-form',
  templateUrl: './appointements-form.component.html',
  styleUrls: ['./appointements-form.component.scss']
})
export class AppointementsFormComponent {
  @ViewChild('formRef', { static: true }) formRef!: NgForm;
  @Input() location: Location | null = null;
  @Output() closeDrawer = new EventEmitter<void>();

  form = this.fb.group({
    date: ['', Validators.required],
  });

  result: DayWithSlot | null = null;
  firstDecember: DayWithSlots = { day: "12/1/2021", slots: [1, 2, 3, 18] };
  secondDecember: DayWithSlots = { day: "12/2/2021", slots: [17, 18] };

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
  ) { }

  hourSelected(hour: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24) {
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
        this.result = {
          day: dateToString(this.form.get('date')!.value),
          slot: hour
        };
        console.log("Fissato appuntamento alle", this.result );
      }
      new ResetForm(this.form, this.formRef);
      this.closeDrawer.emit();
    });
  }
}
