import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { BaseComponent } from './components/base/base.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { BaseRoutingModule } from './base-routing.module';
import { PaginaComponent } from './components/pagina/pagina.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    HomeComponent,
    NavComponent,
    SidebarComponent,
    BaseComponent,
    PaginaComponent,
  ],
  imports: [
    CommonModule,
    BaseRoutingModule,
    SharedModule
  ],
  
  
})
export class BaseModule { }
