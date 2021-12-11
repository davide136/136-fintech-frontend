import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { TransferRoutingModule } from './transfer-routing.module';
import { TransferComponent } from './transfer.component';
import { MaterialModule } from '../../../shared/material/material.module';


@NgModule({
  declarations: [
    TransferComponent,
  ],
  providers: [
    CurrencyPipe,
  ],
  imports: [
    CommonModule, 
    TransferRoutingModule,
    MaterialModule,
  ]
})
export class TransferModule { }
