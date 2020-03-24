import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CiudadService } from '../../ciudad/services/ciudad.service';
import { MatSnackBar, MatTableDataSource, MatPaginator } from '@angular/material';
import { ProductoService } from '../../producto/service/producto.service';
import {Location} from '@angular/common';
import { MovimientoService } from '../service/movimiento.service';

@Component({
  selector: 'app-movimiento-detalle',
  templateUrl: './movimiento-detalle.component.html',
  styleUrls: ['./movimiento-detalle.component.scss']
})
export class MovimientoDetalleComponent implements OnInit {
  titulo = 'Revisar Movimientos del producto'
  constructor(private _productoService: ProductoService, private router:Router, private _location: Location, private movimientoService:MovimientoService) { }
  dataSource = new MatTableDataSource<IMovimiento>();
  @ViewChild(MatPaginator, {static:true}) paginador: MatPaginator;
  displayColumns: string[] = ['bodega', 'ubicacion', 'cantidad', 'fecha'];
  productos : Array<IMovimiento>;

  ngOnInit() {
    let producto = parseInt(sessionStorage.getItem('codigoProducto'))
   this.movimientoService.obtenerMovimientos(producto).subscribe(datos=>this.asignarProductos(datos))
   this.dataSource.paginator = this.paginador
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  asignarProductos(datos){
    let producto:IMovimiento;
    this.productos = []
    datos.resultado.forEach(element => {
       producto= new IMovimiento();
      producto.nombre = element.nombre;
      producto.ubicacion = element.ubicacion;
      producto.cantidad = element.cantidad;
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
  nombre: string;
  ubicacion: string;
  cantidad: number;
  fecha: Date;
}
