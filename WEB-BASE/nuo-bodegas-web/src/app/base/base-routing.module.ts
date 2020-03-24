import {Routes, RouterModule} from '@angular/router';
import { NgModule } from '@angular/core';
import { BodegaComponent } from '../bodega/components/bodega/bodega.component';
import { BodegaFormularioComponent } from '../bodega/components/bodega-formulario/bodega-formulario.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
    {path: '', component:HomeComponent}
];
@NgModule({
    imports:[
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule
    ]
})
export class BaseRoutingModule {}