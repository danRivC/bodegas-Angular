import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TituloComponent } from './components/titulo/titulo.component';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PipeBusquedaFechaPipe } from './pipes/pipe-busqueda-fecha.pipe';



@NgModule({
  declarations: [
    TituloComponent,
    LoadingScreenComponent,
    PipeBusquedaFechaPipe,
    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports:[
    TituloComponent,
    LoadingScreenComponent,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class SharedModule { }
