import { Component, OnInit, ViewChild } from '@angular/core';
import { BodegasService } from '../../../bodega/services/bodegas.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-salida',
  templateUrl: './salida.component.html',
  styleUrls: ['./salida.component.scss']
})
export class SalidaComponent implements OnInit {

  titulo='Movimientos Salidas'
  constructor(private bodega: BodegasService, private router:Router) { }
  dataSource = new MatTableDataSource<IBodegaDataSource>();
  @ViewChild(MatPaginator, {static:true}) paginador: MatPaginator;
  displayColumns: string[] = ['nombre', 'parte', 'bodega', 'cantidad', 'actions'];
  productos : Array<IBodegaDataSource>;

  ngOnInit() {
    this.bodega.devuelveBodegasPorCiudad(parseInt(localStorage.getItem("usuario_ciudad"))).subscribe(datos=>this.asignarProductos(datos), error=>console.log(error));
    this.dataSource.paginator = this.paginador;
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  asignarProductos(datos){
    let producto:IBodegaDataSource;
    this.productos = []
    datos.resultado.forEach(element => {
      producto= new IBodegaDataSource();
      producto.codigo = element.codigo;
      producto.nombre = element.nombre;
      producto.ciudad = element.ciudad;
      producto.estado = element.estado;
      this.productos.push(producto);
    });
    this.dataSource.data = this.productos;
  }


  nuevo(){
    this.router.navigate(['movimiento/detalle']);
    sessionStorage.clear();
  }

  guardarCiudad(producto){
    sessionStorage.setItem('codigoBodega', producto.codigo);
    this.router.navigate(['salidas/detalle'])
  }

}
class IBodegaDataSource{
  public codigo:number;
  public ciudad:string;
  public nombre: string;
  public estado: string;
}