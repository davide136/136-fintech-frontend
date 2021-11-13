import { Component, OnInit } from '@angular/core';
import { Card } from '../../shared/models/card.model';

@Component({
  selector: 'ac-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {
  cards: Card[] = [{ "_id": "dd157a93-e632-490a-8a88-531dd61933f4", "number": "0000 0000 0000 0000", "ownerId": "et45er5e6fba", "owner": "Mario Rossi", "type": "visa", "amount": 15000 }, { "_id": "418a2814-c6da-4e5f-8c9a-bfe0b69649a6", "number": "1111 1111 1111 1111", "ownerId": "et45er5e6fba", "owner": "Mario Rossi", "type": "mastercard", "amount": 500 }, { "_id": "970a55ff-70ba-4c22-b3aa-f4fd8d51ccfb", "number": "2222 2222 2222 2222", "ownerId": "et45er5e6fba", "owner": "Mario Rossi", "type": "visa", "amount": 250000 }];
  constructor() { }

  ngOnInit(): void {
  }
  removeHandler() { }
}
