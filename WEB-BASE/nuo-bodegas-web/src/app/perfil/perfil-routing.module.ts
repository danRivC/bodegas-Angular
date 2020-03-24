import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PerfilComponent } from './components/perfil/perfil.component';
import { PerfilFormularioComponent } from './components/perfil-formulario/perfil-formulario.component';


const routes: Routes = [
  {path:'', component: PerfilComponent},
  {path:'administrar-perfil', component:PerfilFormularioComponent}
]
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
  ],
  exports:[
    RouterModule
  ]
})
export class PerfilRoutingModule { }
