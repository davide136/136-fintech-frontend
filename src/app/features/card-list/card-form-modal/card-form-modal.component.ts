import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { v4 as uuidv4 } from 'uuid';
import { CardDto } from '../../../shared/models/cardDto.model';

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
    @Inject(MAT_DIALOG_DATA) public dto: CardDto,
  ) {
    if (dto) {
      this.form.setValue({
        _id: dto._id,
        ownerId: dto.ownerId,
        owner: dto.owner,
        name: dto.owner.split(' ')[0],
        surname: dto.owner.split(' ')[1],
        amount: dto.amount,
        number: creditCardVisualizer(dto.number),
        type: dto.type,
        code: ''
      })
    }
    else {

      this.form.setValue({
        _id: uuidv4(),
        ownerId: uuidv4(),
        owner: "",
        name: "",
        surname: "",
        amount: 0,
        number: "",
        type: "visa",
        code: ''
      })
    }
    console.log(this.form.value)
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.form.get('owner')?.setValue(this.form.get('name')?.value + ' ' + this.form.get('surname')?.value);
    return this.form.value;
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
