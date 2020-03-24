import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';

import {Location} from '@angular/common';
import { Ciudad } from '../../models/ciudad.model';
import { CiudadService } from '../../services/ciudad.service';


@Component({
  selector: 'app-ciudad-formulario',
  templateUrl: './ciudad-formulario.component.html',
  styleUrls: ['./ciudad-formulario.component.scss']
})
export class CiudadFormularioComponent implements OnInit, OnDestroy{
  titulo = 'Administrar Ciudad';
  activo:boolean;
  inactivo:boolean;
  ciudadForm: FormGroup;
  constructor(private router:Router, private formBuilder:FormBuilder, private location: Location, private ciudadService: CiudadService, private snackBar: MatSnackBar)
  {
    this.buildForm();
  }
  private buildForm(){
    this.ciudadForm= this.formBuilder.group({
      nombre:['', Validators.required],
      estado:['', Validators.required]
    })
  }
  get nombre(){return this.ciudadForm.get('nombre');}
  get estado(){return this.ciudadForm.get('estado');}
  ngOnInit() {
    
    if(sessionStorage.getItem('codigoCiudad')){
      this.ciudadService.traerCiudad(parseInt(sessionStorage.getItem('codigoCiudad'))).subscribe(datos=>this.rellenarCiudad(datos))
    }
  }
  ngOnDestroy(){
    sessionStorage.removeItem('codigoCiudad');
  }
  rellenarCiudad(ciudades){
    let nombre = ciudades.resultado[0].nombre;
    let estado = ciudades.resultado[0].estado;
    this.ciudadForm.setValue({
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
  guardarCiudad(){
    if(this.ciudadForm.valid){
      let ciudad : Ciudad;
      ciudad = new Ciudad();
      ciudad.estado = this.ciudadForm.value.estado;
      ciudad.nombre = this.ciudadForm.value.nombre;
      if(sessionStorage.getItem('codigoCiudad')){
        ciudad.codigo = parseInt(sessionStorage.getItem('codigoCiudad'));
      }else{
        ciudad.codigo = 0;
      }
      this.ciudadService.insertarActualizarCiudad(ciudad).subscribe(datos=>this.confirmacion(datos), error=>console.log(error))
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
    this.router.navigate(['ciudad']);
    }else{
      this.openSnackBar(respuesta.mensaje, 'Cerrar')
    }

  }

}
