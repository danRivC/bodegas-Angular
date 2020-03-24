import { Component, OnInit, OnChanges } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductoService } from '../service/producto.service';
import { MatSnackBar } from '@angular/material';
import { BodegasService } from '../../bodega/services/bodegas.service';
import { TipoProductoService } from '../../tipo-producto/service/tipo-producto.service';
import { ModelosService } from '../../modelos/service/modelos.service';
import { UbicacionService } from '../../ubicacion/service/ubicacion.service';
import { ProveedorService } from '../../proveedor/service/proveedor.service';
import { Location } from '@angular/common';
import { Producto } from '../models/producto.model';
import { Modelos } from '../../modelos/models/modelos.model';
import { TipoProducto } from '../../tipo-producto/models/tipo-producto.model';
import { Proveedor } from '../../proveedor/models/proveedor.model';
import { Ubicacion } from '../../ubicacion/models/ubicacion.model';
import { IBodega } from '../../bodega/models/bodega.model';

@Component({
  selector: 'app-producto-formulario',
  templateUrl: './producto-formulario.component.html',
  styleUrls: ['./producto-formulario.component.scss']
})
export class ProductoFormularioComponent implements OnInit, OnChanges {

  titulo = 'Administrar Productos';
  activo:boolean;
  inactivo:boolean;
  productoForm: FormGroup;
  bodegas: Array<any>=new Array();
  ubicaciones: Array<any>=new Array();
  tipos: Array<any>=new Array();
  modelos: Array<any>=new Array();
  proveedores:Array<any> = new Array();
  activoUbicacion = false;
  movimiento: boolean;
  bodegaActual:number;
  constructor(private router:Router, private _formBuilder:FormBuilder, private _location: Location,
    private _productoService: ProductoService, private _snackBar: MatSnackBar, private bodegaService:BodegasService,
    private tipoService: TipoProductoService, private modeloService: ModelosService, private ubicacionService: UbicacionService,
    private proveedorService:ProveedorService)
  {
    this.buildForm();
  }
  regresar(){
    this._location.back();
  }
  private buildForm(){
    this.productoForm= this._formBuilder.group({
      nombre:['', Validators.required],
      estado:['', Validators.required],

      tipoSelector: ['', Validators.required],
      modeloSelector:['', Validators.required],
      proveedorSelector: ['', Validators.required],
      parte: ['', Validators.required],
      serie:[''],
    })
  }
  get nombre(){return this.productoForm.get('nombre');}
  get estado(){return this.productoForm.get('estado');}


  get tipoSelector(){return this.productoForm.get('tipoSelector');}
  get modeloSelector(){return this.productoForm.get('modeloSelector');}
  get proveedorSelector(){return this.productoForm.get('proveedorSelector');}
  get parte(){return this.productoForm.get('parte');}


  ngOnInit() {
    if(sessionStorage.getItem('codigoProducto')){
      this._productoService.traerProducto(parseInt(sessionStorage.getItem('codigoProducto'))).subscribe(datos=>this.rellenarProducto(datos))
    }
    this.proveedorService.obtenerProveedores().subscribe(datos=>this.agegarProveedores(datos));
    this.tipoService.obtenerTipos().subscribe(datos=>this.agregarTipos(datos));
    this.modeloService.devuelveListaModelos().subscribe(datos=>this.agregarModelos(datos));

  }
  ngOnChanges(){
  }

  rellenarProducto(productos){
    let nombre = productos.resultado[0].nombre_pr;
    let estado = productos.resultado[0].estado_pr;
    let parte = productos.resultado[0].numero_parte_pr;
    let serie = productos.resultado[0].numero_serie_pr;
    let modelo = productos.resultado[0].modelo.codigo;
    let proveedor = productos.resultado[0].proveedor.codigo;
    let tipo = productos.resultado[0].tipo.codigo;
    this.productoForm.setValue({
      nombre:nombre,
      estado:estado,
      parte:parte,
      serie:serie,
      modeloSelector:modelo,
      proveedorSelector:proveedor,
      tipoSelector:tipo,
    })
    if(estado===true){
      this.activo=true;
      this.inactivo = false;
    }else{
      this.activo=false;
      this.inactivo=true;
    }
  }



  guardarProducto(){
    if(this.productoForm.valid){
      let producto:Producto;
      producto = new Producto();
      producto.modelo =  new Modelos(this.productoForm.value.modeloSelector, '', true);
      producto.tipo = new TipoProducto(this.productoForm.value.tipoSelector, '', true);
      producto.proveedor = new Proveedor(this.productoForm.value.proveedorSelector, '', '', true);
      producto.estado_pr = this.productoForm.value.estado;
      producto.nombre_pr = this.productoForm.value.nombre;
      producto.numero_parte_pr = this.productoForm.value.parte;
      producto.numero_serie_pr = this.productoForm.value.serie;
      if(sessionStorage.getItem('codigoProducto')){
        producto.codigo_pr = parseInt(sessionStorage.getItem('codigoProducto'));
      }else{
        producto.codigo_pr = 0
        this.movimiento= false;
      }
      this._productoService.insertarActualizarProducto(producto).subscribe(datos=>this.confirmacion(datos), error=>console.log(error));
    }else{
      this.openSnackBar('Complete campos requeridos', 'Cerrar')
    }
  }
  
  agregarModelos(datos){
    let dato: IdatoSelect;
    this.modelos = [];
    datos.resultado.forEach(element => {
      dato = new IdatoSelect();
      if(element.estado === true){
        dato.codigo = element.codigo;
        dato.nombre = element.nombre;
        this.modelos.push(dato);
      }
    });
  }

  agregarTipos(datos){
    let dato: IdatoSelect;
    this.tipos = [];
    datos.resultado.forEach(element => {
      dato = new IdatoSelect();
      if(element.estado === true){
        dato.codigo = element.codigo;
        dato.nombre = element.nombre;
        this.tipos.push(dato);
      }
    });
  }

  agegarProveedores(datos){
    let dato: IdatoSelect;
    this.proveedores = [];
    datos.resultado.forEach(element => {
      dato = new IdatoSelect();
      if(element.estado === true){
        dato.codigo = element.codigo;
        dato.nombre = element.nombre;
        this.proveedores.push(dato);
      }
    });
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
  confirmacion(respuesta){
    if(parseInt(respuesta.codigo) < 400){
      this.openSnackBar(respuesta.mensaje, 'Cerrar')
    this.router.navigate(['producto']);
    }else{
      this.openSnackBar(respuesta.mensaje, 'Cerrar')
    }
  }
  verificarCambio(ubicacionActual:number, ubicacionAnterior:number){
    if(ubicacionActual === ubicacionAnterior){
      return false;
    }else{
      return true;
    }
  }
}
class IdatoSelect{
  codigo:number;
  nombre: string;
}


