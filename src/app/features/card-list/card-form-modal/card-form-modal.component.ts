import { Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { Card } from '../../../shared/models/card.model';

@Component({
  selector: 'ac-card-form-modal',
  templateUrl: './card-form-modal.component.html',
  styleUrls: ['./card-form-modal.component.scss']
})
export class CardFormModalComponent implements OnChanges{
  @Input() selectedCard: Card | null | undefined= null;
  @Output() cancelEvent = new EventEmitter();
  @Output() submitEvent = new EventEmitter<Card>();
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
  pattern = /[^0-9]/g;

  constructor(private fb: FormBuilder) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('received card',this.selectedCard);
      this.selectedCard &&this.form.setValue({
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
    this.form.get('owner')?.setValue(this.form.get('name')?.value + ' ' + this.form.get('surname')?.value);
    this.submitEvent.emit(this.form.value);
  }

  onCancel() {
    this.form.reset();
    this.cancelEvent.emit();
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
