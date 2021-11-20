import { Component, Input, OnInit } from '@angular/core';
import { Card } from '../../../shared/models/card';
import { Movement } from '../../../shared/models/movement';

@Component({
  selector: 'ac-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.scss']
})
export class MovementsComponent implements OnInit {
  @Input() card: Card | null = null;
  movements: Movement[] = [
    {
      _id: "asdauoshdoajidspoji12314omjc",
      type: 'in',
      amount: 156,
      title: 'Vendita',
      description: 'Venduto iphone xs',
      cardId: 'asdauoshdoajidspoji12314omjc',
      timestamp: 1,
    },
    {
      _id: "asdauoshdoajidspasfffqoji12314omjc",
      type: 'out',
      amount: 400,
      title: 'Acquisto',
      description: 'iPhone 11',
      cardId: 'asdauoshdoajidspoji12314omjc',
      timestamp: 1,
    },
    {
      _id: "asdauoshdodsagsagthetajidspoji12314omjc",
      type: 'in',
      amount: 156,
      title: 'Bolletta',
      description: 'Bolletta corrente',
      cardId: 'asdauoshdoajidspoji12314omjc',
      timestamp: 1,
    },];

  constructor() { }

  ngOnInit(): void {
  }

  dateTime(timestamp: number): string { return "";}

}
