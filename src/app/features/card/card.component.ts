import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Card } from '../../shared/models/card';
import { CardDto } from '../../shared/models/cardDto';

@Component({
  selector: 'ac-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  // Sidemenu
  @ViewChild('drawer') drawer!: MatDrawer;

  //data to be replaced by server call
  cards: Card[] = [{ "_id": "dd157a93-e632-490a-8a88-531dd61933f4", "number": "0000 0000 0000 0000", "ownerId": "et45er5e6fba", "owner": "Mario Rossi", "type": "visa", "amount": 15000 }, { "_id": "418a2814-c6da-4e5f-8c9a-bfe0b69649a6", "number": "1111 1111 1111 1111", "ownerId": "et45er5e6fba", "owner": "Mario Rossi", "type": "mastercard", "amount": 500 }, { "_id": "970a55ff-70ba-4c22-b3aa-f4fd8d51ccfb", "number": "2222 2222 2222 2222", "ownerId": "et45er5e6fba", "owner": "Mario Rossi", "type": "visa", "amount": 250000 }];

  selectedCard: Card | null | undefined = null;

  

  constructor() { }

  addCard() { this.drawer.toggle();}

  cancelHandler() {
    this.selectedCard = null;
    this.drawer.toggle();
    console.log('Canceling')
  }

  submitHandler(res: CardDto) {
    this.drawer.toggle();
    console.log('Trying to submit data');
    if (res)
      this.insertUpdate(res);
  }

  editHandler(card: Card) {
    this.selectedCard = card;
    this.drawer.toggle(true);
  }

  insertUpdate(result: CardDto) {
    console.log('result', result)
    if (result) {
      let isEditing = true;
      this.cards = this.cards.map((card, idx, arr) => {
        if (card._id == result._id) {
          return result;
        }
        if (idx == arr.length-1)
          isEditing = false;
        return card;
      })
      if (!isEditing)
        this.cards = [...this.cards, result];
      console.log(this.cards)
    }
  }
}
