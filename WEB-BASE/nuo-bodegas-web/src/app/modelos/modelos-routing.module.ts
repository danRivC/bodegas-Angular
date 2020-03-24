import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ModelosComponent } from './components/modelos/modelos.component';
import { ModelosFormularioComponent } from './components/modelos-formulario/modelos-formulario.component';

const routes : Routes = [
  {path:'', component: ModelosComponent},
  {path:'administrar-modelos', component:ModelosFormularioComponent}
]

@NgModule({
  declarations: [
    
  ],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]

})
export class ModelosRoutingModule { }
