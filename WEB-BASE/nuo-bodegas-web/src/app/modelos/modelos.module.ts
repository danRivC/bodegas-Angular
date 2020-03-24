import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelosComponent } from './components/modelos/modelos.component';
import { ModelosFormularioComponent } from './components/modelos-formulario/modelos-formulario.component';
import { ModelosRoutingModule } from './modelos-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    ModelosComponent,
    ModelosFormularioComponent
  ],
  imports: [
    CommonModule,
    ModelosRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class ModelosModule { }
