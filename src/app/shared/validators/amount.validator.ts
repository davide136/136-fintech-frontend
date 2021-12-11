import { Directive } from "@angular/core";
import { AbstractControl, ValidationErrors, Validator } from "@angular/forms";

// Semplice funzione (Reactive Forms)
export function amountValidator(control: AbstractControl): ValidationErrors | null {
  let value = Number(control.value);
  if (value != NaN && value > 0)
    return null
  return { validAmount: true }
}

// Direttiva (Template-Driven Forms), a sua volta usa la funzione precedente
@Directive({ selector: '[validAmount]' })
export class AmountValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return amountValidator(control);
  }
}
