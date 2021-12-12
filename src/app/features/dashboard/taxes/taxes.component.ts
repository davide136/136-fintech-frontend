import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { TaxesService } from '../../../api/taxes.service';
import { ResetForm } from '../../../shared/utils/reset-form';
import { CFValidator } from '../../../shared/validators/codice-fiscale.validator';

@Component({
  selector: 'ac-taxes',
  templateUrl: './taxes.component.html',
  styleUrls: ['./taxes.component.scss']
})
export class TaxesComponent implements OnInit {
  @ViewChild('formRef', { static: true }) formRef!: NgForm;
  form = this.fb.group({
    contribuente: this.createContribuente(),
    erario: this.fb.array([]),
    inps: this.fb.array([])
  });

  createContribuente(): FormGroup {
    return this.fb.group({
      codiceFiscale: ['', [Validators.required, CFValidator]],
      cognome: ['', [Validators.required]],
      nome: ['', [Validators.required]],
      dataDiNascita: ['', [Validators.required]],
      sesso: ['', [Validators.required]],
      provinciaDiNascita: ['', [Validators.required]],
      comuneDiNascita: ['', [Validators.required]],
    });
  }

  createErario(): FormGroup {
    return this.fb.group({
      codiceTributo: ['', [Validators.required]],
      anno: ['', [Validators.required]],
      debito: ['', [Validators.required]],
      credito: ['', [Validators.required]],
    });
  }

  createINPS(): FormGroup {
    return this.fb.group({
      codiceSede: ['', [Validators.required]],
      causaleContributo: ['', [Validators.required]],
      codiceInps: ['', [Validators.required]],
      da: ['', [Validators.required]],
      a: ['', [Validators.required]],
      debito: ['', [Validators.required]],
      credito: ['', [Validators.required]],
    })
  }


  totaliErario$ = new BehaviorSubject<number[]>([0,0]);
  totaliInps$ = new BehaviorSubject<number[]>([0,0]);
  totale$ = combineLatest([this.totaliErario$, this.totaliInps$]).pipe(
    map(([totErario, totInps]) => {
      return totErario[1] - totErario[0] + totInps[1] - totInps[0];
    })
  )

  constructor(
    private fb: FormBuilder,
    private taxesService: TaxesService,
    private snackbar: MatSnackBar,
  ) { }

  ngOnInit(): void {
  }

  get erario() {
    return this.form.get('erario') as FormArray;
  }

  get inps() {
    return this.form.get('inps') as FormArray;
  }

  addErario() {
    this.erario.push(this.createErario())
  }

  addINPS() {
    this.inps.push(this.createINPS())
  }

  removeErario(i: number) {
    this.erario.removeAt(i);
    this.erarioDebtChange();
    this.erarioCreditChange();
  }

  removeINPS(i: number) {
    this.inps.removeAt(i);
    this.inpsDebtChange();
    this.inpsCreditChange();
  }

  clearErario() {
    this.erario.clear();
  }

  clearINPS() {
    this.inps.clear();
  }

  requireErario(name: string, index: number) {
    return (this.erario.controls[index] as FormGroup).controls[name]!.hasError('required');
  }

  requireINPS(name: string, index: number) {
    return (this.inps.controls[index] as FormGroup).controls[name]!.hasError('required');
  }

  getFromDate(i: number) {
    return this.inps.controls[i].get('da')?.value;
  }

  getToDate(i: number) {
    return this.inps.controls[i].get('a')?.value;
  }

  erarioDebtChange() {
    this.totaliErario$.next([0, this.totaliErario$.value[1]])
    this.erario.controls.forEach((control) => {
      this.totaliErario$.next([
        this.totaliErario$.value[0] + control.get('debito')?.value,
        this.totaliErario$.value[1]
        ]
      )
    })
  }

  erarioCreditChange() {
    this.totaliErario$.next([this.totaliErario$.value[0],0])
    this.erario.controls.forEach((control) => {
      this.totaliErario$.next([
        this.totaliErario$.value[0],
        this.totaliErario$.value[1] + control.get('credito')?.value
      ]
      )
    })
  }

  inpsDebtChange() {
    this.totaliInps$.next([0, this.totaliInps$.value[1]])
    this.inps.controls.forEach((control) => {
      this.totaliInps$.next([
        this.totaliInps$.value[0] + control.get('debito')?.value,
        this.totaliInps$.value[1]
      ]
      )
    })
  }

  inpsCreditChange() {
    this.totaliInps$.next([this.totaliInps$.value[0], 0])
    this.inps.controls.forEach((control) => {
      this.totaliInps$.next([
        this.totaliInps$.value[0],
        this.totaliInps$.value[1] + control.get('credito')?.value
      ]
      )
    })
  }

  onSubmit() {
    this.taxesService.taxes(this.form.value).subscribe(res => {
      if (res) {
        this.snackbar.open('Invio eseguito con successo', 'Nascondi');
        this.clear()
      }
      else {
        this.snackbar.open('Si è verificato un errore durante l\'invio', 'Nascondi');
      }
    })
  }

  clear() {
    new ResetForm(this.form, this.formRef);
  }
}
