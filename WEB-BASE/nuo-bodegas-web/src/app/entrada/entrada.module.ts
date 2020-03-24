import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntradaDetalleComponent } from './components/entrada-detalle/entrada-detalle.component';
import { EntradaComponent } from './components/entrada/entrada.component';
import { TituloComponent } from '../shared/components/titulo/titulo.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { EntradaRoutingModule } from './entrada-routing.module';




@NgModule({
  declarations: [
    EntradaComponent,
    EntradaDetalleComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    EntradaRoutingModule,
  ]
})
export class EntradaModule { }
