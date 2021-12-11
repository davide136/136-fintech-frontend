import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardsService } from '../../../api/cards.service';
import { Card, Movement } from '../../../shared/models/card';


@Component({
  selector: 'ac-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.scss']
})
export class MovementsComponent {
  @Input() selectedCard: Card | null = null;

  cards: Card[] = [];
  movements: Movement[] = [];
  balance: number = 0;
  balanceColor: string = 'white';

  constructor(
    private cardsService: CardsService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loadAll();    
  }

  ngOnChanges() {
    this.loadAll();
  }

  loadAll() {
    this.cardsService.getAll().subscribe(res => {
      this.cards = res;
      if (res.length > 0) {
        this.activatedRoute.queryParams
          .subscribe(query => {
            if (query.id == undefined)
              this.selectedCard = this.cards[0];
            else {
              this.cards.forEach(c => {
                if (c._id == query.id)
                  this.selectedCard = c;
              });
            }
            this.loadMovements();
          });    
      }
    })
  }

  loadMovements() {
    this.movements = [];

    this.cardsService.movements(
      this.selectedCard!._id,
      15,
      0
    ).subscribe(dto => {
      this.movements = [...dto.data];
      this.loadBalance();
    });
  }

  loadBalance() {
    this.balance = 0;
    this.balanceColor = 'white';

    this.movements.forEach(m => {
      const sign = m.type == 'in' ? 1 : -1;
      this.balance = this.balance + (sign * m.amount);
    });
    if (this.balance == 0) this.balanceColor = "white";
    else if (this.balance > 0) this.balanceColor = "chartreuse";
    else this.balanceColor = "red";
  }
}
