import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { UbicacionService } from './service/ubicacion.service';

@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.component.html',
  styleUrls: ['./ubicacion.component.scss']
})
export class UbicacionComponent implements OnInit {

  titulo='Ubicaciones';
  constructor(private _ubicacionService: UbicacionService, private router:Router) { }
  dataSource = new MatTableDataSource<IUbicacion>();
  @ViewChild(MatPaginator, {static:true}) paginador: MatPaginator;
  displayColumns: string[] = ['codigo', 'descripcion', 'estado', 'actions'];
  ciudades : Array<IUbicacion>;
  ngOnInit() {
    this._ubicacionService.obtenerUbicaciones().subscribe(datos => this.asignarCiudades(datos) , error=>console.log(error));
    this.dataSource.paginator = this.paginador;
  }
  asignarCiudades(datos){
    let ciudad:IUbicacion;
    this.ciudades = []
    datos.resultado.forEach(element => {
       ciudad= new IUbicacion();
      ciudad.codigo = element.codigo;
      ciudad.descripcion = element.descripcion;
      ciudad.estado = element.estado === true ? 'Activo': 'Inactivo';
      this.ciudades.push(ciudad);
    });
    this.dataSource.data = this.ciudades;
  }
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  nuevo(){
    this.router.navigate(['ubicacion/administrar-ubicacion']);
    sessionStorage.clear();
  }

  guardarCiudad(codigo){
    sessionStorage.setItem('codigoUbicacion', codigo);
    this.router.navigate(['ubicacion/administrar-ubicacion'])
  }

}
class IUbicacion{
  codigo:number;
  descripcion:string;
  estado:string;
}
