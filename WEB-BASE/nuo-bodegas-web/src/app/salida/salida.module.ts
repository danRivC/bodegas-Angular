import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalidaDetalleComponent } from './components/salida-detalle/salida-detalle.component';
import { SharedModule } from '../shared/shared.module';
import { SalidaRoutingModule } from './salida-routing.module';
import { SalidaComponent } from './components/salida/salida.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SalidaComponent,
    SalidaDetalleComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SalidaRoutingModule,
    MaterialModule,
   
  ]
})
export class SalidaModule { }
