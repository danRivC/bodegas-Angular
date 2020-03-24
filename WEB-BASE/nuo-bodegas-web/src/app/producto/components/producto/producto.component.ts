import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductoService } from '../../service/producto.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { LoadingScreenService } from '../../../shared/components/loading-screen/service/loading-screen.service';
import { ModalEntradaComponent } from '../modal-entrada/modal-entrada.component';
import { ModalMovimientoComponent } from '../modal-movimiento/modal-movimiento.component';
import { ModalSalidaComponent } from '../modal-salida/modal-salida.component';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {
  titulo='Productos'
  constructor(private productoService: ProductoService, private router:Router, public dialog: MatDialog, private loaderService: LoadingScreenService) { }
  dataSource = new MatTableDataSource<IProducto>();
  @ViewChild(MatPaginator, {static:true}) paginador: MatPaginator;
  displayColumns: string[] = ['codigo', 'nombre', 'tipo', 'parte', 'serie', 'modelo',  'estado', 'actions', 'despachar', 'ingresar', 'mover'];
  productos : Array<IProducto>;

  ngOnInit() {
    debugger
    this.loaderService.display(true);
    this.productoService.obtenerProductos().subscribe(datos=>this.asignarProductos(datos), error=>console.log(error));
    this.dataSource.paginator = this.paginador;
    this.loaderService.display(false);
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  asignarProductos(datos){
    console.log(datos)
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
      producto.proveedor = element.proveedor.nombre;
      this.productos.push(producto);
    });
    this.dataSource.data = this.productos;
  }
  nuevo(){
    this.router.navigate(['producto/administrar-producto']);
    sessionStorage.clear();
  }
  guardarCiudad(codigo){
    sessionStorage.setItem('codigoProducto', codigo);
    this.router.navigate(['producto/administrar-producto'])
  }
  mostrarModalEntrada(producto:IProducto): void{
    const dialogRef = this.dialog.open(ModalEntradaComponent, {
      width: '680px',
      data: producto
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  mostrarModalMovimiento(producto:IProducto): void{
    const dialogRef = this.dialog.open(ModalMovimientoComponent, {
      width: '780px',
      data: producto
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  mostrarModalDespacho(producto:IProducto): void{
    const dialogRef = this.dialog.open(ModalSalidaComponent, {
      width: '680px',
      data: producto
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }



}
class IProducto{
  codigo:number;
  nombre:string;
  parte:string;
  serie:string;
  tipo:string;
  modelo:string;
  proveedor:string;
  estado:string;
}
