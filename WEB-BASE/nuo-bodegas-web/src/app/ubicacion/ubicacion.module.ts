import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UbicacionComponent } from './components/ubicacion/ubicacion.component';
import { UbicacionFormularioComponent } from './components/ubicacion-formulario/ubicacion-formulario.component';
import { UbicacionRoutingModule } from './ubicacion-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    UbicacionComponent,
    UbicacionFormularioComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UbicacionRoutingModule,
    MaterialModule,
  ]
})
export class UbicacionModule { }
