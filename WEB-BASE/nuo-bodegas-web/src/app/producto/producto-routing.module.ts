import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProductoComponent } from './components/producto/producto.component';
import { ProductoFormularioComponent } from './components/producto-formulario/producto-formulario.component';


const routes: Routes = [
  {path:'', component:ProductoComponent},
  {path: 'administrar-producto', component:ProductoFormularioComponent}
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
export class ProductoRoutingModule { }
