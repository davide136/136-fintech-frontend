import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from '../../../shared/models/card';

@Component({
  selector: 'ac-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent {

  @Input() cards: Card[] = [];

  @Output() editCardEvent = new EventEmitter<Card>();

  constructor() { }

  removeCard(_id: string) { this.cards = this.cards.filter(card => card._id != _id) }

  editCard(_id: string) {

    var selectedCard = this.cards.find(card => card._id == _id);
    this.editCardEvent.emit(selectedCard);
  }
}
