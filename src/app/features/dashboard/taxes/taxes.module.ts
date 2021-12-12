import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaxesRoutingModule } from './taxes-routing.module';
import { TaxesComponent } from './taxes.component';
import { MaterialModule } from '../../../shared/material/material.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TaxesComponent,
  ],
  imports: [
    CommonModule,
    TaxesRoutingModule,
    FormsModule,
    MaterialModule,
  ]
})
export class TaxesModule { }
