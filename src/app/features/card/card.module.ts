import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardRoutingModule } from './card-routing.module';
import { CardComponent } from './card.component';
import { CardListComponent } from './card-list/card-list.component';
import { CardFormComponent } from './card-form/card-form.component';
import { MaterialModule } from '../../shared/material/material.module';


@NgModule({
  declarations: [
    CardComponent,
    CardListComponent,
    CardFormComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    CardRoutingModule,
  ]
})
export class CardModule { }
