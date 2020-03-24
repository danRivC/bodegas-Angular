import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ModelosService } from '../../service/modelos.service';

@Component({
  selector: 'app-modelos',
  templateUrl: './modelos.component.html',
  styleUrls: ['./modelos.component.scss']
})
export class ModelosComponent implements OnInit {

  titulo='Modelos';
  constructor(private modelosServiice: ModelosService, private router:Router) { }
  dataSource = new MatTableDataSource<IModelos>();
  @ViewChild(MatPaginator, {static:true}) paginador: MatPaginator;
  displayColumns: string[] = ['codigo', 'nombre', 'estado', 'actions'];
  modelos: Array<IModelos>;
  nuevo(){
    this.router.navigate(['modelos/administrar-modelos']);
    sessionStorage.clear();
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  guardarModelo(codigo){
    sessionStorage.setItem('codigoModelo', codigo);
    this.router.navigate(['modelos/administrar-modelos']);
  }
  ngOnInit() {
    this.modelosServiice.devuelveListaModelos().subscribe(datos=>this.asignarModelos(datos))
  }
  asignarModelos(datos){
    
    let modelo: IModelos;
    this.modelos = [];
    datos.resultado.forEach(element => {
      modelo = new IModelos();
      modelo.codigo = element.codigo;
      modelo.nombre = element.nombre;
      modelo.estado = element.estado === true ? 'Activo':'Inactivo';
      this.modelos.push(modelo);
    });
    this.dataSource.data=this.modelos;
  }
}
class IModelos{
  codigo:number;
  nombre:string;
  estado:string;
}