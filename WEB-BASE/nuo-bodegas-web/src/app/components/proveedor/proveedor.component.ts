import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { ProveedorService } from './service/proveedor.service';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.scss']
})
export class ProveedorComponent implements OnInit {

  titulo='Proveedores';
  constructor(private _proveedorService: ProveedorService, private router:Router) { }
  dataSource = new MatTableDataSource<IProovedor>();
  @ViewChild(MatPaginator, {static:true}) paginador: MatPaginator;
  displayColumns: string[] = ['codigo', 'nombre', 'estado', 'actions'];
  proveedores: Array<IProovedor>;
  nuevo(){
    this.router.navigate(['proveedores/administrar-proveedor']);
    sessionStorage.clear();
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  guardarProovedor(codigo){
    sessionStorage.setItem('codigoProveedor', codigo);
    this.router.navigate(['proveedores/administrar-proveedor']);
  }
  ngOnInit() {
    this._proveedorService.obtenerProveedores().subscribe(datos=>this.asignarProveedor(datos))
  }
  asignarProveedor(datos){
    let proveedor: IProovedor;
    this.proveedores = [];
    datos.resultado.forEach(element => {
      proveedor = new IProovedor();
      proveedor.codigo = element.codigo;
      proveedor.nombre = element.nombre;
      proveedor.estado = element.estado === true ? 'Activo':'Inactivo';
      this.proveedores.push(proveedor);
    });
    this.dataSource.data=this.proveedores;
  }




}

class IProovedor{
  codigo:number;
  nombre: string;
  estado: string;
  ruc: string;

}
