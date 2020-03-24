import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TipoProductoService } from '../../service/tipo-producto.service';
import { TipoProducto } from '../../models/tipo-producto.model';
import {Location} from '@angular/common';

@Component({
  selector: 'app-tipo-producto-formulario',
  templateUrl: './tipo-producto-formulario.component.html',
  styleUrls: ['./tipo-producto-formulario.component.scss']
})
export class TipoProductoFormularioComponent implements OnInit {

  titulo = 'Administrar Tipo de Productos';
  activo:boolean;
  inactivo:boolean;
  tipoForm: FormGroup;
  constructor(private router:Router, private formBuilder:FormBuilder, private location: Location, private tipoProducto: TipoProductoService, private snackBar: MatSnackBar)
  {
    this.buildForm();
  }
  private buildForm(){
    this.tipoForm= this.formBuilder.group({
      nombre:['', Validators.required],
      estado:['', Validators.required]
    })
  }
  get nombre(){return this.tipoForm.get('nombre');}
  get estado(){return this.tipoForm.get('estado');}
  ngOnInit() {
    if(sessionStorage.getItem('codigoTipo')){
      this.tipoProducto.traerTipo(parseInt(sessionStorage.getItem('codigoTipo'))).subscribe(datos=>this.rellenartipo(datos))
    }
  }
  ngOnDestroy(){
    sessionStorage.removeItem('codigoTipo');
  }
  rellenartipo(tipos){
    let nombre = tipos.resultado[0].nombre;
    let estado = tipos.resultado[0].estado;
    this.tipoForm.setValue({
      nombre:nombre,
      estado:estado
    })
    if(estado===true){
      this.activo=true;
      this.inactivo = false;
    }else{
      this.activo=false;
      this.inactivo=true;
    }
  }
  guardarTipo(){
    if(this.tipoForm.valid){
      let tipo : TipoProducto;
      if(sessionStorage.getItem('codigoTipo')){
        tipo = new TipoProducto(parseInt(sessionStorage.getItem('codigoTipo')), this.tipoForm.value.nombre, this.tipoForm.value.estado);
      }else{
        tipo = new TipoProducto(0, this.tipoForm.value.nombre, this.tipoForm.value.estado)
        
      }
      this.tipoProducto.insertarActualizarTipo(tipo).subscribe(datos=>this.confirmacion(datos), error=>console.log(error))
    }else{
      this.openSnackBar('Todos los campos son requeridos', 'Cerrar')
    }
  }
  regresar(){
    this.location.back();
    sessionStorage.clear();
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  confirmacion(respuesta){
    if(parseInt(respuesta.codigo) < 400){
      this.openSnackBar(respuesta.mensaje, 'Cerrar')
    this.router.navigate(['tipo']);
    }else{
      this.openSnackBar(respuesta.mensaje, 'Cerrar')
    }

  }


}
