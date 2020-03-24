import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { KardexService } from '../../service/kardex.service';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import { Kardex } from '../../models/kardex.model';
import { parse } from 'querystring';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ExporterService } from 'src/app/core/exporter.service';

@Component({
  selector: 'app-kardex-detalle',
  templateUrl: './kardex-detalle.component.html',
  styleUrls: ['./kardex-detalle.component.scss']
})
export class KardexDetalleComponent implements OnInit {

  titulo = 'Revisar Movimientos del producto'
  constructor(private kardexService: KardexService,private exporterService:ExporterService,private snackBar:MatSnackBar,private formBuilder: FormBuilder , private location: Location) { }
  dataSource = new MatTableDataSource<IMovimiento>();
  @ViewChild(MatPaginator, {static:true}) paginador: MatPaginator;
  displayColumns: string[] = ['fecha', 'descripcion', 'entrada', 'salida', 'stock'];
  productos : Array<IMovimiento>;
  kardex:Kardex;
  busquedaForm : FormGroup;

  ngOnInit() {
    
    let codigo = parseInt(sessionStorage.getItem('codigoProducto'));
    let codigo_bod = parseInt(sessionStorage.getItem('codigoBodega'));
   this.kardexService.obtenerMovimientosProductoKardex(codigo_bod, codigo, null, null).subscribe(datos=>this.asignarProductos(datos), error=>console.log(error))
   this.dataSource.paginator = this.paginador
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
    let producto:IMovimiento;
    this.productos = []
    datos.resultado.forEach(element => {
       producto= new IMovimiento();
      producto.fecha = element.fecha;
      producto.descripcion = element.descripcion;
      producto.entrada = element.entrada;
      producto.salida = element.salida;
      producto.fecha = element.fecha;
      producto.stock = element.stock;
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
        console.log(fechaInicio)
        console.log(fechaFinal)
        let codigo = parseInt(sessionStorage.getItem('codigoProducto'));
        let codigo_bod = parseInt(sessionStorage.getItem('codigoBodega'));
        this.kardexService.obtenerMovimientosProductoKardex(codigo_bod, codigo, moment(fechaInicio).format('YYYY-MM-DD'), moment(fechaFinal).format('YYYY-MM-DD')).subscribe(datos=>this.asignarProductos(datos), error=>console.log(error))
      }
    }else{
      this.openSnackBar('Los campos de fechas son obligatorios', 'Cerrar');
    }
  }
  exporterAsExcel(){
    this.exporterService.exportToExcel(this.dataSource.filteredData, 'kardex_reporte')

  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}

class IMovimiento{
  fecha:Date;
  descripcion:string;
  entrada:number;
  salida:number;
  stock: number;
}
