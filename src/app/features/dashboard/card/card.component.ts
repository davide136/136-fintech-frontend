import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Card, CardDto } from '../../../shared/models/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CardsService } from '../../../api/cards.service';
import { mergeMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ac-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @ViewChild('drawer') drawer!: MatDrawer;

  cards: Card[] = [];
  cards$ = this.cardsService.getAll().pipe(
    mergeMap(res =>
      this.cards = res
    )
  )
  cardsSub: Subscription | null = null;
  selectedCard: Card | null | undefined = null;

  constructor(
    private _snackBar: MatSnackBar,
    private cardsService: CardsService,
  ) { }

  ngOnInit() {
    this.cardsSub = this.cards$.subscribe();
  }

  ngOnChanges() {
    this.cardsSub = this.cards$.subscribe();
  }

  ngOnDestroy() {
    this.cardsSub?.unsubscribe;
  }

  addCard() {
    this.drawer.toggle(true);
  }

  cancelHandler() {
    this.end();
  }

  submitHandler(res: CardDto) {
    if (res)
      this.insert(res);
  }

  deleteHandler(_id: string) {
    this.cardsService.delete(_id).subscribe(res => {
      if (res) {
        this.cards = this.cards.filter(card => card._id != _id);
      }
      else console.log('An error occurred')
    })
  }

  movementsHandler(card: Card) {
    this.selectedCard = card;
  }

  insert(dto: CardDto) {
    this.cardsService.add(dto).subscribe(
      res => {
        if (res) {
          this.cards = [...this.cards, res];
          this._snackBar.open('Lista carte aggiornata', 'Nascondi');
        }
        else
          this._snackBar.open('Si è verificato un errore', 'Nascondi');
        this.end();
      }
    )
  }

  end() {
    this.selectedCard = null;
    this.drawer.toggle(false);
  }
}
