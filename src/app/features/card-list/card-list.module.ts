import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardListRoutingModule } from './card-list-routing.module';
import { CardListComponent } from './card-list.component';
import { MaterialModule } from '../../shared/material/material.module';
import { CardFormModalComponent } from './card-form-modal/card-form-modal.component';


@NgModule({
  declarations: [
    CardListComponent,
    CardFormModalComponent
  ],
  imports: [
    CommonModule,
    CardListRoutingModule,
    MaterialModule,
  ]
})
export class CardListModule { }
