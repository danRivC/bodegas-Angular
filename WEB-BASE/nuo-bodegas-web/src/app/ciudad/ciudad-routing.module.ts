import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CiudadComponent } from './components/ciudad/ciudad.component';
import { CiudadFormularioComponent } from './components/ciudad-formulario/ciudad-formulario.component';

const routes: Routes =[
  {path:'', component:CiudadComponent},
  {path:'administrar-ciudad', component:CiudadFormularioComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class CiudadRoutingModule { }
