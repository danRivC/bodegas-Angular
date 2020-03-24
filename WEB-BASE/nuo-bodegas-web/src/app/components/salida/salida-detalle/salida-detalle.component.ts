import { Component, OnInit, ViewChild } from '@angular/core';
import { SalidaService } from '../service/salida.service';
import { Router } from '@angular/router';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import {Location} from '@angular/common';
import { from } from 'rxjs';

@Component({
  selector: 'app-salida-detalle',
  templateUrl: './salida-detalle.component.html',
  styleUrls: ['./salida-detalle.component.scss']
})
export class SalidaDetalleComponent implements OnInit {

  titulo = 'Detalle de Salidas'
  constructor(private salidaService: SalidaService, private router:Router, private _location: Location) { }
  dataSource = new MatTableDataSource<IEntrada>();
  @ViewChild(MatPaginator, {static:true}) paginador: MatPaginator;
  displayColumns: string[] = ['fecha', 'nombre', 'serie', 'parte','cantidad', 'proveedor', 'modelo', 'ubicacion', 'detalle'];
  productos : Array<IEntrada>;
  

  ngOnInit() {
   this.salidaService.obtenerDetalle(parseInt(sessionStorage.getItem('codigoBodega'))).subscribe(datos=>this.asignarProductos(datos), error=>console.log(error))
   this.dataSource.paginator = this.paginador
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  asignarProductos(datos){
    console.log(datos)
    let producto:IEntrada;
    this.productos = []
    datos.resultado.forEach(element => {
       producto= new IEntrada();
      producto.fecha = element.fecha;
      producto.nombre = element.nombre;
      producto.serie = element.serie;
      producto.parte = element.parte;
      producto.cantidad = element.cantidad;
      producto.proveedor = element.proveedor;
      producto.modelo = element.modelo;
      producto.ubicacion = element.bodega;
      producto.detalle = element.detalle;
      this.productos.push(producto);
    });
    this.dataSource.data = this.productos;
  }
  regresar(){
    this._location.back();
    sessionStorage.clear();
  }

}
class IEntrada{
  fecha: Date;
  nombre: string;
  serie : string;
  parte: string ;
  cantidad :number;
  proveedor:string;
  modelo:string;
  ubicacion :string;
  detalle:string;
}
