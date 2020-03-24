import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BodegaComponent } from './components/bodega/bodega.component';
import { BodegaFormularioComponent } from './components/bodega-formulario/bodega-formulario.component';


const routes: Routes =[
  {path:'', component:BodegaComponent},
  {path: 'administrar-bodegas', component:BodegaFormularioComponent}
]
@NgModule({
  declarations: [
  ],
  imports: [
    RouterModule.forChild(routes),
  ],
  exports:[
    RouterModule
  ]
})
export class BodegaRoutingModule { }
