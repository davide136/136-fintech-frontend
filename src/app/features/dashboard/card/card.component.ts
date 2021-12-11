import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Card, CardDto } from '../../../shared/models/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CardsService } from '../../../api/cards.service';
import { map, mergeMap } from 'rxjs/operators';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ac-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @ViewChild('drawer') drawer!: MatDrawer;

  cards$ = new BehaviorSubject<Card[]>([]);
  selectedCardId$ = new BehaviorSubject<string>('');
  selectedCard$ = combineLatest([this.cards$, this.selectedCardId$]).pipe(
    map(([cards, id]) => {
      return cards.find(card => card._id === id)
    })
  );

  constructor(
    private _snackBar: MatSnackBar,
    private cardsService: CardsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.loadCards();
  }

  loadCards() {
    this.cardsService.getAll().pipe(
      map(res =>
        this.cards$.next(res)
      )
    ).subscribe();
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
        this.cards$.next(this.cards$.value.filter(card => card._id != _id));
        this._snackBar.open('La carta selezionata è stata elimintata', 'Nascondi');
      }
      else this._snackBar.open('Si è verificato un errore', 'Nascondi');
    })
  }

  movementsHandler(id: string) {
    this.selectedCardId$.next(id);
    console.log('id', id)
    console.log('router', this.router)
    this.router.navigate([
      '../movements/'+id,
    ], { relativeTo: this.activatedRoute })
  }

  insert(dto: CardDto) {
    this.cardsService.add(dto).subscribe(
      res => {
        if (res) {
          this.cards$.next([...this.cards$.value, res]);
          this._snackBar.open('Lista carte aggiornata', 'Nascondi');
        }
        else
          this._snackBar.open('Si è verificato un errore', 'Nascondi');
        this.end();
      }
    )
  }

  end() {
    this.selectedCardId$.next('');
    this.drawer.toggle(false);
  }
}
