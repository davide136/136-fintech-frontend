import { EventEmitter, Output } from '@angular/core';
import { Component, Input } from '@angular/core';
import { from, of } from 'rxjs';
import { map, reduce, tap } from 'rxjs/operators';
import { Movement } from '../../../../shared/models/card';


@Component({
  selector: 'ac-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.scss']
})
export class MovementsComponent {
  @Input() movements: Movement[] = [];
  @Output() closeEvent = new EventEmitter<void>();

  balance: number = 0;
  balanceColor: string = 'white';

  constructor() { }

  ngOnInit() {
    console.log('movements',this.movements)
    this.movements.forEach(m => {
      const sign = m.type == 'in' ? 1 : -1;
      this.balance = this.balance + (sign * m.amount);
    });
    console.log('balance',this.balance)
    if (this.balance == 0) this.balanceColor = "white";
    else if (this.balance > 0) this.balanceColor = "chartreuse";
    else this.balanceColor = "red";
    console.log('balanceColor',this.balanceColor)
  }

  close() {
    this.closeEvent.emit();
  }
}
