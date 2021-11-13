import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardListRoutingModule } from './card-list-routing.module';
import { CardListComponent } from './card-list.component';
import { MaterialModule } from '../../shared/material/material.module';


@NgModule({
  declarations: [
    CardListComponent
  ],
  imports: [
    CommonModule,
    CardListRoutingModule,
    MaterialModule,
  ]
})
export class CardListModule { }
