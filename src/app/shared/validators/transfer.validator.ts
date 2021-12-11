import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidatorFn, ValidationErrors, Validator } from "@angular/forms";
import { Observable } from "rxjs";
import { debounceTime, map } from "rxjs/operators";
import { CardsService } from "../../api/cards.service";

@Injectable({ providedIn: 'root' })
export class TransferValidator {

  constructor(private cardsService: CardsService) { }

  validate(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      return this.cardsService.getAll().pipe(
        map(cards => cards.find(c => c._id == control.get('cardId')!.value)),
        map(card => {
          return card!._id == control.get('cardId')!.value &&
            control.get('amount')!.value > card!.amount ?
            { notEnoughBalance: true } : null
        }
      ))
    }
  }
}
