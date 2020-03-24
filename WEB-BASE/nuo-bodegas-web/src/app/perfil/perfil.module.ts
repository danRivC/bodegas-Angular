import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilComponent } from './components/perfil/perfil.component';
import { PerfilFormularioComponent } from './components/perfil-formulario/perfil-formulario.component';
import { PerfilRoutingModule } from './perfil-routing.module';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    PerfilComponent,
    PerfilFormularioComponent
  ],
  imports: [
    CommonModule,
    PerfilRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class PerfilModule { }
