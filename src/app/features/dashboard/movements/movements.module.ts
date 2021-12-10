import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material/material.module';
import { FormsModule } from '@angular/forms';
import { MovementComponent } from './movement/movement.component';
import { MovementsComponent } from './movements.component';
import { MovementsRoutingModule } from './movements-routing.module';
import { AbsoluteCurrencyPipe } from '../../../shared/pipes/absolute-currency.pipe';

@NgModule({
  declarations: [
    MovementComponent,
    MovementsComponent,
    AbsoluteCurrencyPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    MovementsRoutingModule
  ]
})
export class MovementsModule { }
