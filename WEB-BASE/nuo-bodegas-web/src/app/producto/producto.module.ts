import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ProductoComponent } from './components/producto/producto.component';
import { ProductoFormularioComponent } from './components/producto-formulario/producto-formulario.component';
import { ProductoRoutingModule } from './producto-routing.module';
import { ModalSalidaComponent } from './components/modal-salida/modal-salida.component';
import { ModalMovimientoComponent } from './components/modal-movimiento/modal-movimiento.component';
import { ModalEntradaComponent } from './components/modal-entrada/modal-entrada.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    ProductoComponent,
    ProductoFormularioComponent,
    ModalSalidaComponent,
    ModalMovimientoComponent,
    ModalEntradaComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProductoRoutingModule,
    MaterialModule
  ],
  entryComponents:[
    ModalSalidaComponent,
    ModalMovimientoComponent,
    ModalEntradaComponent
  ]
})
export class ProductoModule { }
