import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Card, CardDto, Movement } from '../../../shared/models/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CardsService } from '../../../api/cards.service';
import { mergeMap, tap, map } from 'rxjs/operators';
import { of, Subscription } from 'rxjs';

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
  )
  cardsSub: Subscription | null = null;
  drawer_selector: string = "";
  selectedCard: Card | null | undefined = null;
  movements: Movement[] = [];
  movements$ = new Subscription();

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
    this.drawer_selector = "insertUpdateView";
    this.drawer.toggle();
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
    this.movements$ = this.cardsService.movements(
      this.selectedCard._id,
      15,
      0
    ).subscribe(dto => {
      this.movements = [ ...dto.data ];
      this.drawer.toggle(true);
      this.drawer_selector = "movementsView";
    });
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
    this.drawer_selector = "";
  }
}
