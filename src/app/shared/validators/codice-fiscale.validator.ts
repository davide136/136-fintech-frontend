import { Directive } from "@angular/core";
import { AbstractControl, ValidationErrors, Validator } from "@angular/forms";

// Semplice funzione (Reactive Forms)
export function CFValidator(control: AbstractControl): ValidationErrors | null {
  let regex = '^[A-Z]{6}[0-9]{2}[A-Z][0-9]{2}[A-Z][0-9]{3}[A-Z]$';
  let tester = RegExp(regex);
  let input = control.value;
  if (input) {
    let cf = input.toUpperCase();
    let result = tester.test(cf);
    if(result) return null
  }
  return  { invalidCF: true };
}

// Direttiva (Template-Driven Forms), a sua volta usa la funzione precedente
@Directive({ selector: '[validCF]' })
export class AmountValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return CFValidator(control);
  }
}
