import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuardService } from './core/auth-guard.services';
import { BaseComponent } from './components/base/base.component';
import { UsuarioComponent } from './components/usuario/usuario.component';


const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'', component: BaseComponent, canActivate:[AuthGuardService], children:[
    {path:'home', component:HomeComponent},
    {path:'usuarios', component: UsuarioComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
