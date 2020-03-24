import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CiudadComponent } from './components/ciudad/ciudad.component';
import { CiudadFormularioComponent } from './components/ciudad-formulario/ciudad-formulario.component';
import { CiudadRoutingModule } from './ciudad-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';





@NgModule({
  declarations: [
    CiudadComponent,
    CiudadFormularioComponent,
    
  ],
  imports: [
    CommonModule,
    CiudadRoutingModule,
    
    SharedModule,
    MaterialModule
    
  ]
})
export class CiudadModule { }
