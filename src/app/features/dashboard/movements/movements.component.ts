import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { CardsService } from '../../../api/cards.service';
import { Card, Movement } from '../../../shared/models/card';

//TODO:   shouldLoadMore

@Component({
  selector: 'ac-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.scss']
})
export class MovementsComponent {
  cards$ = new BehaviorSubject<Card[]>([]);
  movements$ = new BehaviorSubject<Movement[]>([]);
  selectedCardId$ = new BehaviorSubject<string>('');
  selectedCardId: string = '';
  balance$ = new BehaviorSubject<number>(0);
  balanceColor$ = new BehaviorSubject<string>('white');
  selectedCard$ = combineLatest([this.cards$, this.selectedCardId$]).pipe(
    map(([cards, id]) => {
      return cards.find(card => card._id === id)
    })
  );


  constructor(
    private cardsService: CardsService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loadAll();    
  }

  loadAll() {
    this.cardsService.getAll().subscribe(res => {
      this.cards$.next(res);
      if (res.length > 0) {
        this.activatedRoute.params
          .subscribe(query => {
            if (query['id'] == undefined)
              this.selectedCardId$.next(this.cards$.value.length > 0 ?
                this.cards$.value[0]._id : '');
            else {
              this.selectedCardId$.next(query['id'])
            }
            this.loadMovements(null);
          });    
      }
    })
  }

  loadMovements(change: any) {
    this.movements$.next([]);
    if (change && change.value) {
      this.selectedCardId$.next(change.value)
    }
    this.selectedCardId = this.selectedCardId$.value
    this.cardsService.movements(
      this.selectedCardId$.value,
      15,
      0
    ).subscribe(dto => {
      this.movements$.next([...dto.data]);
      this.loadBalance();
    });
  }

  loadBalance() {
    this.balance$.next(0);
    this.balanceColor$.next('white');

    this.movements$.value.forEach(m => {
      const sign = m.type == 'in' ? 1 : -1;
      this.balance$.next(this.balance$.value + (sign * m.amount));
    });
    if (this.balance$.value == 0) this.balanceColor$.next("white");
    else if (this.balance$.value > 0) this.balanceColor$.next("chartreuse");
    else this.balanceColor$.next("red");
  }
}
