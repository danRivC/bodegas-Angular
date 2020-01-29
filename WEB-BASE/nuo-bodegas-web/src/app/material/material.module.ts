import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import {  MatPaginator, MatPaginatorModule } from '@angular/material/paginator';







@NgModule({
  declarations: [],

  imports: [
    CommonModule,
    MatTableModule,
    
    MatPaginator,
  ],
  exports:[
    MatTableModule,
    
    MatPaginator,
  ]
})
export class MaterialModule { }
