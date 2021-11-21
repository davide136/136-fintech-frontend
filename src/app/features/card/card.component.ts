import { Component, ViewChild } from '@angular/core';
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
  drawer_selector: string = "";
  selectedCard: Card | null | undefined = null;



  constructor() { }

  addCard() {
    this.drawer_selector = "insertUpdateView";
    this.drawer.toggle();
  }

  cancelHandler() {
    this.selectedCard = null;
    this.drawer.toggle();
  }

  submitHandler(res: CardDto) {
    this.drawer.toggle();
    if (res)
      this.insertUpdate(res);
  }

  editHandler(card: Card) {
    this.drawer_selector = "insertUpdateView";
    this.selectedCard = card;
    this.drawer.toggle(true);
  }

  movementsHandler(card: Card) {
    this.drawer_selector = "movementsView";
    this.selectedCard = card;
    this.drawer.toggle(true);
  }

  insertUpdate(result: CardDto) {
    this.drawer_selector = "";
    if (result) {
      let isEdited = false;
      this.cards = this.cards.map((card, idx, arr) => {
        if (card._id == result._id) {
          isEdited = true;
          return result;
        }
        else
          return card;
      })
      if (!isEdited) this.cards = [...this.cards, result];
    }
  }
}
