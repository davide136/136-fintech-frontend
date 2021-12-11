import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaxesRoutingModule } from './taxes-routing.module';
import { TaxesComponent } from './taxes.component';
import { MaterialModule } from '../../../shared/material/material.module';
import { FormsModule } from '@angular/forms';
import { ErarioComponent } from './erario/erario.component';
import { InpsComponent } from './inps/inps.component';
import { ContribuenteComponent } from './contribuente/contribuente.component';


@NgModule({
  declarations: [
    TaxesComponent,
    ErarioComponent,
    InpsComponent,
    ContribuenteComponent
  ],
  imports: [
    CommonModule,
    TaxesRoutingModule,
    FormsModule,
    MaterialModule,
  ]
})
export class TaxesModule { }
