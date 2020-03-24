import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SalidaComponent } from './components/salida/salida.component';
import { SalidaDetalleComponent } from './components/salida-detalle/salida-detalle.component';


const routes: Routes = [
  {path:'', component: SalidaComponent},
  {path:'detalle', component:SalidaDetalleComponent}
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
export class SalidaRoutingModule { }
