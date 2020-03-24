import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { EntradaComponent } from './components/entrada/entrada.component';
import { EntradaDetalleComponent } from './components/entrada-detalle/entrada-detalle.component';

const routes:Routes = [
  {path: '', component:EntradaComponent},
  {path: 'detalle', component:EntradaDetalleComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class EntradaRoutingModule { }
