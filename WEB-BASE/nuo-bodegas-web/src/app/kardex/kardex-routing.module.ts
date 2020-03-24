import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { KardexComponent } from './components/kardex/kardex.component';
import { KardexDetalleComponent } from './components/kardex-detalle/kardex-detalle.component';

const routes:Routes = [
  {path:'', component:KardexComponent},
  {path:'detalle', component:KardexDetalleComponent},
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
export class KardexRoutingModule { }
