import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModelosService } from '../service/modelos.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { BodegasService } from '../../bodega/services/bodegas.service';
import {Location} from '@angular/common';
import { Modelos } from '../models/modelos.model';

@Component({
  selector: 'app-modelos-formulario',
  templateUrl: './modelos-formulario.component.html',
  styleUrls: ['./modelos-formulario.component.scss']
})
export class ModelosFormularioComponent implements OnInit {
  titulo = 'Administrar Modelo';
  activo:boolean;
  inactivo:boolean;
  modelosForm: FormGroup;
  constructor(private router:Router, private _formBuilder:FormBuilder, private _location: Location, private _modelosService: ModelosService, private _snackBar: MatSnackBar, private _bodegasService: BodegasService) 
  { 
    this.buildForm();
  }

  private buildForm(){
    this.modelosForm= this._formBuilder.group({
      nombre:['', Validators.required],
      estado:['', Validators.required]
    })
  }

  get nombre(){return this.modelosForm.get('nombre');}
  get estado(){return this.modelosForm.get('estado');}
  ngOnInit() {
    if(sessionStorage.getItem('codigoModelo')){
      this._modelosService.devuelveModelo(parseInt(sessionStorage.getItem('codigoModelo'))).subscribe(datos=>this.rellenarModelo(datos))
    }
  }
  ngOnDestroy(){
    sessionStorage.removeItem('codigoModelo');
  }
  rellenarModelo(modelos){
    let nombre = modelos.resultado[0].nombre;
    let estado = modelos.resultado[0].estado;
    this.modelosForm.setValue({
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
  regresar(){
    this._location.back();
    sessionStorage.clear();
  }
  guardarModelos(){
    if(this.modelosForm.valid){
      let modelo : Modelos;
      if(sessionStorage.getItem('codigoModelo')){
        modelo = new Modelos(parseInt(sessionStorage.getItem('codigoModelo')), this.modelosForm.value.nombre, this.modelosForm.value.estado);
      }else{
        modelo = new Modelos(0, this.modelosForm.value.nombre, this.modelosForm.value.estado);
      }
      this._modelosService.insertaActualizaModelo(modelo).subscribe(datos=>this.confirmacion(datos), error=>console.log(error))
    }else{
      this.openSnackBar('Todos los campos son requeridos', 'Cerrar')
    }
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
  confirmacion(respuesta){
    if(parseInt(respuesta.codigo) < 400){
      this.openSnackBar(respuesta.mensaje, 'Cerrar')
    this.router.navigate(['modelos']);
    }else{
      this.openSnackBar(respuesta.mensaje, 'Cerrar')
    }

  }

}
