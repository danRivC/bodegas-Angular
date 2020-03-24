import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Router } from '@angular/router';
import { KardexService } from '../../service/kardex.service';

@Component({
  selector: 'app-kardex',
  templateUrl: './kardex.component.html',
  styleUrls: ['./kardex.component.scss']
})
export class KardexComponent implements OnInit {

  titulo='Movimientos Kardex'
  constructor(private kardexService: KardexService, private router:Router) { }
  dataSource = new MatTableDataSource<IProducto>();
  @ViewChild(MatPaginator, {static:true}) paginador: MatPaginator;
  displayColumns: string[] = ['nombre', 'parte', 'bodega', 'cantidad', 'actions'];
  productos : Array<IProducto>;

  ngOnInit() {
    this.kardexService.obtenerProductosKardex(parseInt(localStorage.getItem("usuario_ciudad"))).subscribe(datos=>this.asignarProductos(datos), error=>console.log(error));
    this.dataSource.paginator = this.paginador;
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  asignarProductos(datos){
    let producto:IProducto;
    this.productos = []
    datos.resultado.forEach(element => {
      producto= new IProducto();
      producto.codigo_bod = element.codigo_bod;
      producto.codigo = element.codigo;
      producto.nombre = element.nombre;
      producto.parte = element.parte;
      producto.bodega = element.bodega;
      producto.cantidad = element.cantidad;
      this.productos.push(producto);
    });
    this.dataSource.data = this.productos;
  }


  nuevo(){
    this.router.navigate(['movimiento/detalle']);
    sessionStorage.clear();
  }

  guardarCiudad(producto){
    sessionStorage.setItem('codigoProducto', producto.codigo);
    sessionStorage.setItem('codigoBodega', producto.codigo_bod);
    this.router.navigate(['kardex/detalle'])
  }

}
class IProducto{
  codigo_bod:number;
  codigo:number;
  nombre:string;
  parte:string;
  bodega:string;
  cantidad:number;
}
