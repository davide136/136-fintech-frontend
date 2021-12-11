import { Directive } from "@angular/core";
import { AbstractControl, ValidationErrors, Validator } from "@angular/forms";

// Semplice funzione (Reactive Forms)
export function IBANValidator(control: AbstractControl): ValidationErrors | null {

  //let regex = '^(?:(?:IT|SM)\d{2}[A-Z]\d{22}|CY\d{2}[A-Z]\d{23}|NL\d{2}[A-Z]{4}\d{10}|LV\d{2}[A-Z]{4}\d{13}|(?:BG|BH|GB|IE)\d{2}[A-Z]{4}\d{14}|GI\d{2}[A-Z]{4}\d{15}|RO\d{2}[A-Z]{4}\d{16}|KW\d{2}[A-Z]{4}\d{22}|MT\d{2}[A-Z]{4}\d{23}|NO\d{13}|(?:DK|FI|GL|FO)\d{16}|MK\d{17}|(?:AT|EE|KZ|LU|XK)\d{18}|(?:BA|HR|LI|CH|CR)\d{19}|(?:GE|DE|LT|ME|RS)\d{20}|IL\d{21}|(?:AD|CZ|ES|MD|SA)\d{22}|PT\d{23}|(?:BE|IS)\d{24}|(?:FR|MR|MC)\d{25}|(?:AL|DO|LB|PL)\d{26}|(?:AZ|HU)\d{27}|(?:GR|MU)\d{28})$';
  //let tester = RegExp(regex);
  //return tester.test(control.value) ? null : { invalidIBAN: true };

  if ((control.value as string) && (control.value as string).length <= 27) return null;
  return { validIBAN: true }
}

// Direttiva (Template-Driven Forms), a sua volta usa la funzione precedente
@Directive({ selector: '[invalidIBAN]' })
export class IBANValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return IBANValidator(control);
  }
}
