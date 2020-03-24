import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BodegaComponent } from './components/bodega/bodega.component';
import { BodegaFormularioComponent } from './components/bodega-formulario/bodega-formulario.component';
import { MaterialModule } from '../material/material.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { BodegaRoutingModule } from './bodega-routing.module';




@NgModule({
  declarations: [
    BodegaComponent,
    BodegaFormularioComponent,
    
  ],
  imports: [
    CommonModule,
    MaterialModule,
    BodegaRoutingModule,
    SharedModule
  ]
})
export class BodegaModule { }
