import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { Card } from '../../../../shared/models/card';
import { ResetForm } from '../../../../shared/utils/reset-form';
import { creditCardVisualizer } from '../../../../shared/utils/creditCardVisualizer';
import { CardDto } from '../../../../api/cards.service';

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
    //form properties
    name: ['', [Validators.required]],
    surname: ['', [Validators.required]],
    number: ['', [
      Validators.required,
      Validators.minLength(19),
      Validators.maxLength(19),
    ]],
    csc: ['', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(3),
    ]],
    type: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder) {

  }

  ngOnChanges(): void {
    this.selectedCard && this.form.patchValue({
        _id: this.selectedCard._id,
        name: this.selectedCard.owner.split(' ')[0],
        surname: this.selectedCard.owner.split(' ')[1],
        number: creditCardVisualizer(this.selectedCard.number),
        type: this.selectedCard.type,
        csc: ''
      })
  }

  onSubmit() {
    this.submitEvent.emit(this.form.value);
  }

  onCancel() {
    this.resetForm();
    this.cancelEvent.emit();
  }

  resetForm() {
    new ResetForm(this.form, this.formRef);
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

