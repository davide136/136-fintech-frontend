import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Card } from '../../shared/models/card.model';
import { CardDto } from '../../shared/models/cardDto.model';
import { CardFormModalComponent } from './card-form-modal/card-form-modal.component';

@Component({
  selector: 'ac-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {
  cards: Card[] = [{ "_id": "dd157a93-e632-490a-8a88-531dd61933f4", "number": "0000 0000 0000 0000", "ownerId": "et45er5e6fba", "owner": "Mario Rossi", "type": "visa", "amount": 15000 }, { "_id": "418a2814-c6da-4e5f-8c9a-bfe0b69649a6", "number": "1111 1111 1111 1111", "ownerId": "et45er5e6fba", "owner": "Mario Rossi", "type": "mastercard", "amount": 500 }, { "_id": "970a55ff-70ba-4c22-b3aa-f4fd8d51ccfb", "number": "2222 2222 2222 2222", "ownerId": "et45er5e6fba", "owner": "Mario Rossi", "type": "visa", "amount": 250000 }];

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  removeCard(_id: string) { this.cards = this.cards.filter(card => card._id!=_id) }
  addCard() {
    const dialogRef = this.dialog.open(CardFormModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.insertUpdate(result);
    });
  }

  editCard(_id: string) {
    var selectedCard: Card | undefined = this.cards.find(card => card._id == _id);
    console.log(selectedCard)
    if (selectedCard) {
      const dialogRef = this.dialog.open(CardFormModalComponent, {
        data: selectedCard
      });

      dialogRef.afterClosed().subscribe(result => {
        this.insertUpdate(result);
      });
    }   
  }

  insertUpdate(result: CardDto) {
    console.log('result', result)
    if (result) {
      let isEditing = true;
      this.cards = this.cards.map((card, idx, arr)  => {
        if (card._id == result._id ) {
          return result;
        }
        if (idx == arr.length - 1)
          isEditing = false;
        return card;
      })
      if (!isEditing)
        this.cards = [...this.cards, result]; 
    }
  }
  
}
