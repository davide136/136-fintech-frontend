import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Card } from '../../../shared/models/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CardsService } from '../../../api/cards.service';
import { v4 as uuidv4 } from 'uuid';
import { mergeMap, tap } from 'rxjs/operators';

@Component({
  selector: 'ac-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @ViewChild('drawer') drawer!: MatDrawer;

  cards: Card[] = [];
  cards$ = this.cardsService.getAll().pipe(
    tap(res => console.log(res)),
    mergeMap(res =>
      this.cards = res
    )
  );
  drawer_selector: string = "";
  selectedCard: Card | null | undefined = null;



  constructor(
    private _snackBar: MatSnackBar,
    private cardsService: CardsService,
  ) { }

  ngOnInit() {
    this.cards$.subscribe();
  }

  ngOnChanges() {
    this.cards$.subscribe();
  }

  addCard() {
    this.drawer_selector = "insertUpdateView";
    this.drawer.toggle();
  }

  cancelHandler() {
    this.selectedCard = null;
    this.drawer.toggle();
  }

  submitHandler(res: any) {
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

  insertUpdate(dto: any) {
    this.drawer_selector = "";
    if (dto._id) {
      this.cardsService.update(dto).subscribe(
        res => {
          if (res) {
            this.cards = this.cards.map((card, idx, arr) => {
              if (card._id == res._id) {
                return res;
              }
              else
                return card;
            });
            this._snackBar.open('Lista carte aggiornata', 'Nascondi');
          }
          else
            this._snackBar.open('Si è verificato un errore', 'Nascondi');
          this.end();
        }
      )
    }
    else {
      this.cardsService.add(dto).subscribe(
        res => {
          if (res) {
            res._id = uuidv4();
            this.cards = [...this.cards, res];
            this._snackBar.open('Lista carte aggiornata', 'Nascondi');
          }
          else
            this._snackBar.open('Si è verificato un errore', 'Nascondi');
          this.end();
        }
      )

    }    
  }

  end() {
    this.selectedCard = null;
    this.drawer.toggle();
  }
}
