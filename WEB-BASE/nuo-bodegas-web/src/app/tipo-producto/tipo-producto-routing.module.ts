import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TipoProductoComponent } from './components/tipo-producto/tipo-producto.component';
import { TipoProductoFormularioComponent } from './components/tipo-producto-formulario/tipo-producto-formulario.component';



const routes: Routes = [
  {path:'', component:TipoProductoComponent},
  {path:'administrar-tipo', component:TipoProductoFormularioComponent}
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
export class TipoProductoRoutingModule { }
