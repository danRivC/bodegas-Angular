import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoProductoFormularioComponent } from './components/tipo-producto-formulario/tipo-producto-formulario.component';
import { SharedModule } from '../shared/shared.module';
import { TipoProductoRoutingModule } from './tipo-producto-routing.module';
import { TipoProductoComponent } from './components/tipo-producto/tipo-producto.component';
import { MaterialModule } from '../material/material.module';




@NgModule({
  declarations: [
    TipoProductoComponent,
    TipoProductoFormularioComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TipoProductoRoutingModule,
    MaterialModule,

  ]
})
export class TipoProductoModule { }
