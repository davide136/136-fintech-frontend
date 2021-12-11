import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidatorFn, ValidationErrors, Validator } from "@angular/forms";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { CardsService } from "../../api/cards.service";

@Injectable({ providedIn: 'root' })
export class CardIdValidator {

  constructor(private cardsService: CardsService) { }

  validate(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      return this.cardsService.getAll().pipe(
        map(cards => cards.find(c => c._id == control.get('cardId')!.value)),
        map(card => {
          return card ? null : { cardDoesNotExist: true }
        }
        ))
    }
  }
}
