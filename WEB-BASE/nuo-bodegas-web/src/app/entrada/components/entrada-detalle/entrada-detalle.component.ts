import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { EntradaService } from '../../service/entrada.service';
import {Location} from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ExporterService } from 'src/app/core/exporter.service';

@Component({
  selector: 'app-entrada-detalle',
  templateUrl: './entrada-detalle.component.html',
  styleUrls: ['./entrada-detalle.component.scss']
})
export class EntradaDetalleComponent implements OnInit {

  titulo = 'Detalle de Entradas'
  constructor(private entradaService: EntradaService, private exporterService:ExporterService ,private snackBar:MatSnackBar ,private formBuilder: FormBuilder  ,private location: Location) { }
  dataSource = new MatTableDataSource<IEntrada>();
  @ViewChild(MatPaginator, {static:true}) paginador: MatPaginator;
  displayColumns: string[] = ['fecha', 'nombre', 'serie', 'parte','cantidad', 'proveedor', 'modelo', 'ubicacion', 'detalle'];
  productos : Array<IEntrada>;
  busquedaForm : FormGroup;
  

  ngOnInit() {
    let codigo_bodega = parseInt(sessionStorage.getItem('codigoBodega'))
   this.entradaService.obtenerDetalle(codigo_bodega, null, null).subscribe(datos=>this.asignarProductos(datos), error=>console.log(error))
   this.dataSource.paginator = this.paginador;
   this.buildForm();
  }
  private buildForm(){
    this.busquedaForm = this.formBuilder.group({
      fecha_inicio: ['', Validators.required],
      fecha_final: ['', Validators.required],
    })
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  filtrarFecha(fechaInicial: any, fechaFinal:any){
    console.log(Date.parse(fechaFinal))
    console.log(Date.parse(fechaInicial))
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
        
        this.entradaService.obtenerDetalle(codigo_bodega, moment(fechaInicio).format("YYYY-MM-DD") , moment(fechaFinal).format("YYYY-MM-DD")).subscribe(datos=>this.asignarProductos(datos), error=>console.log(error))
      }
    }else{
      this.openSnackBar('Los campos de fechas son obligatorios', 'Cerrar');
    }
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
      producto.ubicacion = element.ubicacion;
      producto.detalle = element.detalle;
      this.productos.push(producto);
    });
    this.dataSource.data = this.productos;
  }
  regresar(){
    this.location.back();
    sessionStorage.clear();
  }

  exporterAsExcel(){
    this.exporterService.exportToExcel(this.dataSource.filteredData, 'entrada_reporte')

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
