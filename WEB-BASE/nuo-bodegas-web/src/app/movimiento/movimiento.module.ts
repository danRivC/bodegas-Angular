import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MovimientoComponent } from './components/movimiento/movimiento.component';
import { MovimientoDetalleComponent } from './components/movimiento-detalle/movimiento-detalle.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [MovimientoComponent, MovimientoDetalleComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
  ]
})
export class MovimientoModule { }
