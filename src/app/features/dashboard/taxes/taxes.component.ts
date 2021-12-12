import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { TaxesService } from '../../../api/taxes.service';
import { CFValidator } from '../../../shared/validators/codice-fiscale.validator';

@Component({
  selector: 'ac-taxes',
  templateUrl: './taxes.component.html',
  styleUrls: ['./taxes.component.scss']
})
export class TaxesComponent implements OnInit {
  form = this.fb.group({
    contribuente: this.createContribuente(),
    erario: this.fb.array([]),
    inps: this.fb.array([])
  });

  createContribuente(): FormGroup {
    return this.fb.group({
      cf: ['', [Validators.required, CFValidator]],
      surname: ['', [Validators.required]],
      name: ['', [Validators.required]],
      birthday: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      county: ['', [Validators.required]],
      city: ['', [Validators.required]],
    });
  }

  createErario(): FormGroup {
    return this.fb.group({
      cod_tributo: ['', [Validators.required]],
      ref_year: ['', [Validators.required]],
      debt: ['', [Validators.required]],
      credit: ['', [Validators.required]],
    });
  }

  createINPS(): FormGroup {
    return this.fb.group({
      cod_sede: ['', [Validators.required]],
      tax_subject: ['', [Validators.required]],
      inps_code: ['', [Validators.required]],
      from: ['', [Validators.required]],
      to: ['', [Validators.required]],
      debit: ['', [Validators.required]],
      credit: ['', [Validators.required]],
    })
  }

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
  }

  removeINPS(i: number) {
    this.inps.removeAt(i);
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
    return this.inps.controls[i].get('from')?.value;
  }

  getToDate(i: number) {
    return this.inps.controls[i].get('to')?.value;
  }

  onSubmit() {

  }
}
