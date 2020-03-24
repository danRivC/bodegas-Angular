import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { UsuarioFormularioComponent } from './components/usuario-formulario/usuario-formulario.component';


const routes:Routes = [
  {path:'', component:UsuarioComponent},
  {path: 'administrar-usuarios', component:UsuarioFormularioComponent}
]
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class UsuarioRoutingModule { }
