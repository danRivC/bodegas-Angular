import { Component, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CiudadService } from '../../services/ciudad.service';


@Component({
  selector: 'app-ciudad',
  templateUrl: './ciudad.component.html',
  styleUrls: ['./ciudad.component.scss']
})

export class CiudadComponent implements OnInit {
  titulo='Ciudades';
  constructor(private ciudadService: CiudadService, private router:Router) { }
  dataSource = new MatTableDataSource<ICiudad>();
  @ViewChild(MatPaginator, {static:true}) paginador: MatPaginator;
  displayColumns: string[] = ['codigo', 'nombre', 'estado', 'actions'];
  ciudades : Array<ICiudad>;
  ngOnInit() {
    this.ciudadService.obtenerCiudades().subscribe(datos => this.asignarCiudades(datos) , error=>console.log(error));
    this.dataSource.paginator = this.paginador;
  }
  asignarCiudades(datos){
    let ciudad:ICiudad;
    this.ciudades = []
    datos.resultado.forEach(element => {
       ciudad= new ICiudad();
      ciudad.codigo = element.codigo;
      ciudad.nombre = element.nombre;
      ciudad.estado = element.estado === true ? 'Activo': 'Inactivo';
      this.ciudades.push(ciudad);
    });
    this.dataSource.data = this.ciudades;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  nuevo(){
    this.router.navigate(['ciudad/administrar-ciudad']);
    sessionStorage.clear();
  }

  guardarCiudad(codigo){
    sessionStorage.setItem('codigoCiudad', codigo);
    this.router.navigate(['ciudad/administrar-ciudad'])
  }

}
class ICiudad{
  codigo:number;
  nombre:string;
  estado:string
}