import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AuthGuardService } from './core/auth-guard.services';

import { BaseComponent } from './base/components/base/base.component';





const routes: Routes = [
  {path:'login', loadChildren:()=>import('./login/login.module').then(m=>m.LoginModule)},
  {path:'', component: BaseComponent, canActivate:[AuthGuardService], children:[
    {path: 'home', loadChildren: ()=> import('./base/base.module').then(m=>m.BaseModule)},
    {path: 'usuarios', loadChildren:()=>import('./usuario/usuario.module').then(m=>m.UsuarioModule)},
    {path: 'perfiles', loadChildren:()=>import('./perfil/perfil.module').then(m=>m.PerfilModule)},
    {path: 'bodegas',loadChildren:() => import('./bodega/bodega.module').then(m=>m.BodegaModule)},
    {path: 'ciudad', loadChildren:()=> import('./ciudad/ciudad.module').then(m=>m.CiudadModule)},
    {path: 'proveedores', loadChildren:()=>import('./proveedor/proveedor.module').then(m=>m.ProveedorModule)},
    {path: 'modelos', loadChildren :()=>import('./modelos/modelos.module').then(m=>m.ModelosModule)},
    {path: 'ubicacion', loadChildren: ()=>import('./ubicacion/ubicacion.module').then(m=>m.UbicacionModule)},
    {path: 'tipo', loadChildren:()=>import('./tipo-producto/tipo-producto.module').then(m=>m.TipoProductoModule)},
    {path: 'producto', loadChildren:()=>import('./producto/producto.module').then(m=>m.ProductoModule)},
    {path: 'kardex', loadChildren:()=>import('./kardex/kardex.module').then(m=>m.KardexModule)},
    {path: 'entradas', loadChildren:()=> import('./entrada/entrada.module').then(m=>m.EntradaModule)},
    {path: 'salidas', loadChildren:()=>import('./salida/salida.module').then(m=>m.SalidaModule)},

  ]
}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
