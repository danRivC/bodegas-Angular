import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProveedorComponent } from './components/proveedor/proveedor.component';
import { ProovedorFormularioComponent } from './components/proovedor-formulario/proovedor-formulario.component';

const routes: Routes = [
  {path:'',component:ProveedorComponent},
  {path: 'administrar-proveedor', component:ProovedorFormularioComponent}
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
export class ProveedorRoutingModule { }
