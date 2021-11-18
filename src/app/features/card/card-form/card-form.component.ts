import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Form, FormBuilder, NgForm, Validators } from '@angular/forms';
import { Card } from '../../../shared/models/card';
import { v4 as uuidv4 } from 'uuid';
import { CardDto } from '../../../shared/models/cardDto';

@Component({
  selector: 'ac-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.scss']
})
export class CardFormComponent implements OnChanges{
  @ViewChild('formRef', { static: true }) formRef!: NgForm;

  @Input() selectedCard: Card | null | undefined = null;

  @Output() cancelEvent = new EventEmitter();
  @Output() submitEvent = new EventEmitter<CardDto>();

  pattern = /[^0-9]/g;
  form = this.fb.group({
    //hidden properties
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

  constructor(private fb: FormBuilder) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('received card', this.selectedCard);
    this.selectedCard && this.form.patchValue({
        _id: this.selectedCard._id,
        ownerId: this.selectedCard.ownerId,
        owner: this.selectedCard.owner,
        name: this.selectedCard.owner.split(' ')[0],
        surname: this.selectedCard.owner.split(' ')[1],
        amount: this.selectedCard.amount,
        number: creditCardVisualizer(this.selectedCard.number),
        type: this.selectedCard.type,
        code: ''
      })
  }

  onSubmit() {
    if (!this.form.get('id')?.value)
      this.form.patchValue({ id: uuidv4() });
    if (!this.form.get('ownerId')?.value)
      this.form.patchValue({ ownerId: uuidv4() });
    if (!this.form.get('amount')?.value)
      this.form.patchValue({ amount: 0 });
    this.form.patchValue({
      owner: this.form.get('name')?.value + ' ' + this.form.get('surname')?.value
    });
    this.submitEvent.emit(this.form.value);
    this.resetForm();
  }

  onCancel() {
    this.resetForm();
    this.cancelEvent.emit();
  }

  resetForm() {
    this.form.reset();
    this.formRef.resetForm();
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
