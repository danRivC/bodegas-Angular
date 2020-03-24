import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductoService } from '../../../producto/service/producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movimiento',
  templateUrl: './movimiento.component.html',
  styleUrls: ['./movimiento.component.scss']
})
export class MovimientoComponent implements OnInit {
  titulo='Movimientos'
  constructor(private productoService: ProductoService, private router:Router) { }
  dataSource = new MatTableDataSource<IProducto>();
  @ViewChild(MatPaginator, {static:true}) paginador: MatPaginator;
  displayColumns: string[] = ['codigo', 'nombre', 'tipo', 'bodega', 'ubicacion', 'parte', 'serie', 'modelo',  'estado', 'actions'];
  productos : Array<IProducto>;

  ngOnInit() {
    this.productoService.obtenerProductos().subscribe(datos=>this.asignarProductos(datos), error=>console.log(error));
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
      producto.codigo = element.codigo_pr;
      producto.nombre = element.nombre_pr;
      producto.parte = element.numero_parte_pr;
      producto.serie = element.numero_serie_pr;
      producto.estado = element.estado_pr === true ? 'Activo': 'Inactivo';
      producto.tipo = element.tipo.nombre;
      producto.modelo = element.modelo.nombre;
      producto.ubicacion = element.ubicacion.descripcion;
      producto.proveedor = element.proveedor.nombre;
      producto.bodega = element.bodega.nombre;
      this.productos.push(producto);
    });
    this.dataSource.data = this.productos;
  }


  nuevo(){
    this.router.navigate(['movimiento/detalle']);
    sessionStorage.clear();
  }

  guardarCiudad(codigo){
    sessionStorage.setItem('codigoProducto', codigo);
    this.router.navigate(['movimiento/detalle'])
  }

}
class IProducto{
  codigo:number;
  nombre:string;
  parte:string;
  serie:string;
  tipo:string;
  modelo:string;
  bodega:string;
  proveedor:string;
  estado:string;
  ubicacion:string;
}
