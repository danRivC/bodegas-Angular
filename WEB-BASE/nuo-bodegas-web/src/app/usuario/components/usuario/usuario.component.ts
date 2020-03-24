import { Component, OnInit, ViewChild } from '@angular/core';

import { NgForm } from '@angular/forms';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UsuarioService } from '../../service/usuario.service';
import { IUsuario } from '../../models/usuario.model';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  constructor(private usuarioService: UsuarioService, private snackBar: MatSnackBar, private router:Router) {}
  titulo = "Usuarios";
  datos: Array<IUsuario>;
  dataSource = new MatTableDataSource<IUsuario>();
  displayColumns: string[] = ['codigo', 'nombre', 'apellido', 'username', 'correo', 'estaActivo', 'actions'];
  

  @ViewChild(MatPaginator, {static:true}) paginador: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginador;
    this.obtenerDatos();
  }

  obtenerDatos(){
    this.usuarioService.obtenerTodosUsuarios("", true).subscribe(datos=>this.asignarUsuarios(datos), error=>this.manejarerror(error));
  }

  buscar(form: NgForm){
    var username: string = form.value.username;
    var estado: boolean = form.value.estado;
    this.usuarioService.obtenerTodosUsuarios(username, estado).subscribe(datos=>this.asignarUsuarios(datos), error=>this.manejarerror(error));
  }

  asignarUsuarios(datos){
    this.datos= datos.resultado;
    for (let index = 0; index < datos.length; index++) {
       this.datos[index] = datos[index];
    }
    this.dataSource.data=this.datos
  }

  manejarerror(error){
    if(error.mensaje !== undefined){
      this.openSnackBar(error.mensaje, 'cerrar');
    }else{
      this.openSnackBar(error, 'cerrar');
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  cargarUsuario(codigo: number){
    localStorage.setItem('codigoUser', codigo.toString());
    this.router.navigate(['/usuarios/administrar-usuarios']);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}

