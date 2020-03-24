import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { IPerfil } from '../../models/perfil.model';
import { PerfilService } from '../../service/perfil.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  titulo = "Perfiles";
  datos: Array<IPerfil>;
  dataSource = new MatTableDataSource<IPerfil>();
  constructor(private perfilService: PerfilService, private snackBar: MatSnackBar, private router:Router ) { }
  displayColumns: string[] = ['codigo', 'nombre', 'estaActivo', 'actions'];
  @ViewChild(MatPaginator, {static:true}) paginador: MatPaginator;


  ngOnInit() {
    this.dataSource.paginator = this.paginador;
    this.obtenerPerfiles();
  }
  cargarPerfil(codigo:number){
    localStorage.setItem("perfilCodigo", codigo.toString());
    this.router.navigate(['perfiles/administrar-perfil']);
  }

  obtenerPerfiles(){
      this.perfilService.traerPerfiles().subscribe(datos=>this.asignarPerfiles(datos), error=>this.openSnackBar(error.mensaje, "Cerrar"))
  }

  asignarPerfiles(datos){
    
    this.datos= datos.resultado;
    for (let index = 0; index < datos.length; index++) {
       this.datos[index] = datos[index];
    }
    this.dataSource.data=this.datos
    
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  nuevoPerfil(){
    localStorage.removeItem("perfilCodigo");
    this.router.navigate(['perfiles/administrar-perfil']);
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
