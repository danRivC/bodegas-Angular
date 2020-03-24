import { Component, OnInit, ViewChild } from '@angular/core';
import { TipoProductoService } from '../../service/tipo-producto.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-tipo-producto',
  templateUrl: './tipo-producto.component.html',
  styleUrls: ['./tipo-producto.component.scss']
})
export class TipoProductoComponent implements OnInit {
  titulo='Tipo de Productos';
  constructor(private tipoProductoService: TipoProductoService, private router:Router) { }
  dataSource = new MatTableDataSource<ITipoProducto>();
  @ViewChild(MatPaginator, {static:true}) paginador: MatPaginator;
  displayColumns: string[] = ['codigo', 'nombre', 'estado', 'actions'];
  ciudades : Array<ITipoProducto>;
  ngOnInit() {
    this.tipoProductoService.obtenerTipos().subscribe(datos => this.asignarTipo(datos) , error=>console.log(error));
    this.dataSource.paginator = this.paginador;
  }
  asignarTipo(datos){
    let tipo:ITipoProducto;
    this.ciudades = []
    datos.resultado.forEach(element => {
      tipo= new ITipoProducto();
      tipo.codigo = element.codigo;
      tipo.nombre = element.nombre;
      tipo.estado = element.estado === true ? 'Activo': 'Inactivo';
      this.ciudades.push(tipo);
    });
    this.dataSource.data = this.ciudades;
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  nuevo(){
    this.router.navigate(['tipo/administrar-tipo']);
    sessionStorage.clear();
  }
  guardarTipo(codigo){
    sessionStorage.setItem('codigoTipo', codigo);
    this.router.navigate(['tipo/administrar-tipo']);
  }

}
class ITipoProducto{
  codigo: number;
  nombre: string;
  estado: string;
}
