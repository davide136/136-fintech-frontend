import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from '../../../../shared/models/card';

@Component({
  selector: 'ac-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent {

  @Input() cards: Card[] | null = [];
  @Output() movementsEvent = new EventEmitter<string>();
  @Output() deleteEvent = new EventEmitter<string>();

  constructor() { }

  removeCard(_id: string) {
    this.deleteEvent.emit(_id);
  }

  movements(_id: string) {
    this.movementsEvent.emit(_id);
  }
}
