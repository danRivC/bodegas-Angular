import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioFormularioComponent } from './components/usuario-formulario/usuario-formulario.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { SharedModule } from '../shared/shared.module';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UsuarioComponent,
    UsuarioFormularioComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UsuarioRoutingModule,
    MaterialModule,
    
  ]
})
export class UsuarioModule { }
