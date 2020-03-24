import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';

import { AuthGuardService } from './core/auth-guard.services';
import { AuthInterceptorService } from './core/auth-interceptor.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';








import { AutenticationService } from './login/service/autentication.service';
import { LoadingScreenService } from './shared/components/loading-screen/service/loading-screen.service';

import { BodegaModule } from './bodega/bodega.module';
import { BaseModule } from './base/base.module';
import { CiudadModule } from './ciudad/ciudad.module';
import { KardexModule } from './kardex/kardex.module';
import { LoginModule } from './login/components/login/login.module';
import { SharedModule } from './shared/shared.module';
import { ModelosModule } from './modelos/modelos.module';
import { PerfilModule } from './perfil/perfil.module';
import { ProductoModule } from './producto/producto.module';
import { ProveedorModule } from './proveedor/proveedor.module';
import { SalidaModule } from './salida/salida.module';
import { UsuarioModule } from './usuario/usuario.module';
import { UbicacionModule } from './ubicacion/ubicacion.module';
import { TipoProductoModule } from './tipo-producto/tipo-producto.module';

@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    BodegaModule,
    BaseModule,
    CiudadModule,
    KardexModule,
    LoginModule,
    SharedModule,
    ModelosModule,
    PerfilModule,
    ProductoModule,
    ProveedorModule,
    SalidaModule,
    UsuarioModule,
    UbicacionModule,
    TipoProductoModule
    ],
  entryComponents:[
    
    ],
  providers: [
    
    AuthGuardService,
    AuthInterceptorService,
    AutenticationService,
    LoadingScreenService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
