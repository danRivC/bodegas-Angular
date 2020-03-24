import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProveedorComponent } from './components/proveedor/proveedor.component';
import { ProovedorFormularioComponent } from './components/proovedor-formulario/proovedor-formulario.component';
import { ProveedorRoutingModule } from './proveedor-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    ProveedorComponent,
    ProovedorFormularioComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProveedorRoutingModule,
    MaterialModule
  ]
})
export class ProveedorModule { }
