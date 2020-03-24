import { Component, OnInit, ViewChild } from '@angular/core';
import { SalidaService } from '../../service/salida.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import {Location} from '@angular/common';
import { from } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ExporterService } from 'src/app/core/exporter.service';

@Component({
  selector: 'app-salida-detalle',
  templateUrl: './salida-detalle.component.html',
  styleUrls: ['./salida-detalle.component.scss']
})
export class SalidaDetalleComponent implements OnInit {

  titulo = 'Detalle de Salidas'
  constructor(private salidaService: SalidaService,private snackBar:MatSnackBar,private formBuilder: FormBuilder , private router:Router, private location: Location, private exporterService: ExporterService) { }
  dataSource = new MatTableDataSource<IEntrada>();
  @ViewChild(MatPaginator, {static:true}) paginador: MatPaginator;
  displayColumns: string[] = ['fecha', 'nombre', 'serie', 'parte','cantidad', 'proveedor', 'modelo', 'ubicacion', 'detalle'];
  productos : Array<IEntrada>;
  busquedaForm : FormGroup;

  ngOnInit() {
   this.salidaService.obtenerDetalle(parseInt(sessionStorage.getItem('codigoBodega')), null, null).subscribe(datos=>this.asignarProductos(datos), error=>console.log(error))
   this.dataSource.paginator = this.paginador;
   this.buildForm();
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  private buildForm(){
    this.busquedaForm = this.formBuilder.group({
      fecha_inicio: ['', Validators.required],
      fecha_final: ['', Validators.required],
    })
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
    this.location.back();
    sessionStorage.clear();
  }
  buscar(){
    let codigo_bodega = parseInt(sessionStorage.getItem('codigoBodega'));
    if(this.busquedaForm.valid){
      let fechaInicio = new Date(this.busquedaForm.value.fecha_inicio);
      let fechaFinal = new Date(this.busquedaForm.value.fecha_final);
      if(fechaInicio > fechaFinal){
        this.openSnackBar('La fecha Inicial debe ser menor a la fecha Final', 'Cerrar')
      }
      else{
        this.salidaService.obtenerDetalle(codigo_bodega, moment(fechaInicio).format("YYYY-MM-DD") , moment(fechaFinal).format("YYYY-MM-DD")).subscribe(datos=>this.asignarProductos(datos), error=>console.log(error))
        
      }
    }else{
      this.openSnackBar('Los campos de fechas son obligatorios', 'Cerrar');
    }
  }
  exporterAsExcel(){
    this.exporterService.exportToExcel(this.dataSource.filteredData, 'salida_reporte')

  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
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
