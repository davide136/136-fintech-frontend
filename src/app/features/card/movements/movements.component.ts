import { Component, Input } from '@angular/core';
import { from, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Card } from '../../../shared/models/card';
import { Movement } from '../../../shared/models/movement';


@Component({
  selector: 'ac-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.scss']
})
export class MovementsComponent {
  @Input() card: Card | null = null;

  movements: Movement[] = [
    {
      _id: "asdauoshdoajidspoji12314omjc",
      type: 'in',
      amount: 10,
      title: 'Vendita',
      description: 'Venduto iphone xs',
      cardId: 'asdauoshdoajidspoji12314omjc',
      timestamp: 155511651316423,
    },
    {
      _id: "asdauoshdoajidspasfffqoji12314omjc",
      type: 'out',
      amount: 10,
      title: 'Acquisto',
      description: 'iPhone 11',
      cardId: 'asdauoshdoajidspoji12314omjc',
      timestamp: 415543453451,
    },
    {
      _id: "asdauoshdodsagsagthetajidspoji12314omjc",
      type: 'in',
      amount: 0,
      title: 'Bolletta',
      description: 'Bolletta corrente',
      cardId: 'asdauoshdoajidspoji12314omjc',
      timestamp: 11232135,
    },];
  balance: number = 0;

  sub = from(this.movements).pipe(
    tap(m => {
      if (m.type == 'in') this.balance = this.balance + m.amount;
      else this.balance = this.balance - m.amount;
    })
  ).subscribe();
  balance$ = of(this.balance).pipe();
  balancePositive$ = of(this.balance).pipe(
    map(b => {
      if (b == 0) return "white";
      else if (b > 0) return "green";
      return "red";
    })
  )

  constructor() { }

  ngOnChange() {

  }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
