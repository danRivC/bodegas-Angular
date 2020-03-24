import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UbicacionComponent } from './components/ubicacion/ubicacion.component';
import { UbicacionFormularioComponent } from './components/ubicacion-formulario/ubicacion-formulario.component';


const routes: Routes =[
  {path:'', component:UbicacionComponent},
  {path:'administrar-ubicacion', component:UbicacionFormularioComponent}
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
export class UbicacionRoutingModule { }
