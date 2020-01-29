import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './components/login/login.component';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { AuthGuardService } from './core/auth-guard.services';

import { AuthInterceptorService } from './core/auth-interceptor.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AutenticationService } from './core/autentication.service';
import { NavComponent } from './components/nav/nav.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PaginaComponent } from './components/pagina/pagina.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BaseComponent } from './components/base/base.component';
import { UsuarioFormularioComponent } from './components/usuario/usuario-formulario/usuario-formulario.component';
import { TituloComponent } from './components/base/titulo/titulo.component';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material';






@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavComponent,
    SidebarComponent,
    PaginaComponent,
    UsuarioComponent,
    BaseComponent,
    UsuarioFormularioComponent,
    TituloComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [
    AuthGuardService,
    AuthInterceptorService,
    AutenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
