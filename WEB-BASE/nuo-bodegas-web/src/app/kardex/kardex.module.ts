import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KardexDetalleComponent } from './components/kardex-detalle/kardex-detalle.component';
import { KardexComponent } from './components/kardex/kardex.component';
import { KardexRoutingModule } from './kardex-routing.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TituloComponent } from '../shared/components/titulo/titulo.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    KardexComponent,
    KardexDetalleComponent,
    
  ],
  imports: [
    CommonModule,
    KardexRoutingModule,
    MaterialModule,
   
    SharedModule,
    MaterialModule,
  ]
})
export class KardexModule { }
