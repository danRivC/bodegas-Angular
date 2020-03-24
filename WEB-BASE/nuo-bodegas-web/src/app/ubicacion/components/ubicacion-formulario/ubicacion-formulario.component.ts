import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Ubicacion } from '../../models/ubicacion.model';
import { UbicacionService } from '../../service/ubicacion.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-ubicacion-formulario',
  templateUrl: './ubicacion-formulario.component.html',
  styleUrls: ['./ubicacion-formulario.component.scss']
})
export class UbicacionFormularioComponent implements OnInit {

  titulo = 'Administrar Ubicacion';
  activo:boolean;
  inactivo:boolean;
  ubicacionForm: FormGroup;
  constructor(private router:Router, private formBuilder:FormBuilder, private location: Location, private ubicacion: UbicacionService, private snackBar: MatSnackBar)
  {
    this.buildForm();
  }
  private buildForm(){
    this.ubicacionForm= this.formBuilder.group({
      descripcion:['', Validators.required],
      estado:['', Validators.required]
    })
  }
  get descripcion(){return this.ubicacionForm.get('descripcion');}
  get estado(){return this.ubicacionForm.get('estado');}
  ngOnInit() {
    
    if(sessionStorage.getItem('codigoUbicacion')){
      this.ubicacion.traerUbicacion(parseInt(sessionStorage.getItem('codigoUbicacion'))).subscribe(datos=>this.rellenarCiudad(datos))
    }
  }
  ngOnDestroy(){
    sessionStorage.removeItem('codigoUbicacion');
  }
  rellenarCiudad(ciudades){
    let descripcion = ciudades.resultado[0].descripcion;
    let estado = ciudades.resultado[0].estado;
    this.ubicacionForm.setValue({
      descripcion:descripcion,
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
  guardarUbicacion(){
    if(this.ubicacionForm.valid){
      let ciudad : Ubicacion;
      if(sessionStorage.getItem('codigoUbicacion')){
        ciudad = new Ubicacion(parseInt(sessionStorage.getItem('codigoUbicacion')), this.ubicacionForm.value.descripcion, this.ubicacionForm.value.estado);
      }else{
        ciudad = new Ubicacion(0, this.ubicacionForm.value.descripcion, this.ubicacionForm.value.estado);
      }
      this.ubicacion.insertarActualizarUbicaciones(ciudad).subscribe(datos=>this.confirmacion(datos), error=>console.log(error))
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
    this.router.navigate(['ubicacion']);
    }else{
      this.openSnackBar(respuesta.mensaje, 'Cerrar')
    }

  }

}
