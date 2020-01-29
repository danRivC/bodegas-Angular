import { Component, OnInit, ViewChild } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UsuarioService } from 'src/app/core/usuario.service';

import { NgForm, FormBuilder, FormGroup } from '@angular/forms';
import { IUsuario } from 'src/app/models/usuario.model';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  constructor(private usuarioService: UsuarioService) {}
  datos: Array<IUsuario>;
  dataSource = new MatTableDataSource<IUsuario>(this.datos);
  displayColumns: string[] = ['codigo', 'nombre', 'apellido', 'username', 'correo', 'actions'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.obtenerDatos();
  }
  obtenerDatos(){
    this.usuarioService.obtenerTodosUsuarios("", true).subscribe(datos=>this.asignarUsuarios(datos));
    this.dataSource.paginator = this.paginator;
  }
  buscar(form: NgForm){
    var username: string = form.value.username;
    var estado: boolean = form.value.estado;
    this.usuarioService.obtenerTodosUsuarios(username, estado).subscribe(datos=>this.asignarUsuarios(datos));
    this.dataSource.paginator = this.paginator;
  }
  titulo = "Usuarios";
  asignarUsuarios(datos){
    this.dataSource= datos.resultado
    this.dataSource.paginator = this.paginator;
  }

}
