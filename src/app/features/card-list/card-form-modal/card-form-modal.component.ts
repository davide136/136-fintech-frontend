import { Component, Inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { v4 as uuidv4 } from 'uuid';
import { Card } from '../../../shared/models/card.model';

@Component({
  selector: 'ac-card-form-modal',
  templateUrl: './card-form-modal.component.html',
  styleUrls: ['./card-form-modal.component.scss']
})
export class CardFormModalComponent implements OnInit{
  console = console
  form = this.fb.group({
    //hiddent properties
    _id:[''],
    ownerId:[''],
    owner:[''],
    amount: [''],
    //form properties
    name: ['', [Validators.required]],
    surname: ['', [Validators.required]],
    number: ['', [
      Validators.required,
      Validators.minLength(19),
      Validators.maxLength(19),
    ]],
    code: ['', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(3),
    ]],
    type: ['', [Validators.required]],
  });
  pattern = /[^0-9]/g;


  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public card: Card,
  ) {
    if (card) {
      this.form.setValue({
        _id: card._id,
        ownerId: card.ownerId,
        owner: card.owner,
        name: card.owner.split(' ')[0],
        surname: card.owner.split(' ')[1],
        amount: card.amount,
        number: creditCardVisualizer(card.number),
        type: card.type,
        code: ''
      })
    }
  }

  ngOnInit(): void {
  }  

  onSubmit() {
    this.form.value._id = this.form.value._id ?? uuidv4();
    this.form.value.ownerId = this.form.value.ownerId ?? uuidv4();
    this.form.value.owner = this.form.value.owner ??
      this.form.value.name + " " + this.form.value.surname;
    this.form.value.amount = this.form.value.amount ?? 0;
  }

  transformNumber(value: string) {
    value = value.replace(this.pattern, "");
    if (this.form && this.form.get('number')) {
      let transformValue = creditCardVisualizer(value);
      this.form.get('number')!.setValue(transformValue);
    }
  }

  transformCode(value: string) {
    value = value.replace(this.pattern, "");
    if (this.form && this.form.get('code')) {
      this.form.get('code')!.setValue(value);
    }
  }
}

function creditCardNormalizer(number: string): string {
  return number.split(' ').join('');
}

function creditCardVisualizer(number: string): string {
  number = creditCardNormalizer(number);
  if (number.length < 5)
    return number;

  if (number.length < 9)
    return number.substring(0, 4) + ' ' +
      number.substring(4, number.length);

  if (number.length < 13)
    return number.substring(0, 4) + ' ' +
      number.substring(4, 8) + ' ' +
      number.substring(8, number.length);

  if (number.length < 17)
    return number.substring(0, 4) + ' ' +
      number.substring(4, 8) + ' ' +
      number.substring(8, 12) + ' ' +
      number.substring(12, number.length);

  // nubmer.length > 16
  return number.substring(0, 4) + ' ' +
    number.substring(4, 8) + ' ' +
    number.substring(8, 12) + ' ' +
    number.substring(12, 16);
;

}
