import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { KardexService } from '../service/kardex.service';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import { Kardex } from '../models/kardex.model';
import { parse } from 'querystring';

@Component({
  selector: 'app-kardex-detalle',
  templateUrl: './kardex-detalle.component.html',
  styleUrls: ['./kardex-detalle.component.scss']
})
export class KardexDetalleComponent implements OnInit {

  titulo = 'Revisar Movimientos del producto'
  constructor(private kardexService: KardexService, private router:Router, private _location: Location) { }
  dataSource = new MatTableDataSource<IMovimiento>();
  @ViewChild(MatPaginator, {static:true}) paginador: MatPaginator;
  displayColumns: string[] = ['fecha', 'descripcion', 'entrada', 'salida'];
  productos : Array<IMovimiento>;
  kardex:Kardex;

  ngOnInit() {
    this.kardex = new Kardex();
    this.kardex.codigo = parseInt(sessionStorage.getItem('codigoProducto'));
    this.kardex.codigo_bod = parseInt(sessionStorage.getItem('codigoBodega'));
   this.kardexService.obtenerMovimientosProductoKardex(this.kardex).subscribe(datos=>this.asignarProductos(datos), error=>console.log(error))
   this.dataSource.paginator = this.paginador
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  asignarProductos(datos){
    console.log(datos)
    let producto:IMovimiento;
    this.productos = []
    datos.resultado.forEach(element => {
       producto= new IMovimiento();
      producto.fecha = element.fecha;
      producto.descripcion = element.descripcion;
      producto.entrada = element.entrada;
      producto.salida = element.salida;
      producto.fecha = element.fecha;
      this.productos.push(producto);
    });
    this.dataSource.data = this.productos;
  }
  regresar(){
    this._location.back();
    sessionStorage.clear();
  }

}
class IMovimiento{
  fecha:Date;
  descripcion:string;
  entrada:number;
  salida:number;
}
