import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Location} from '@angular/common';

import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';
import { Ubicacion } from '../../../ubicacion/models/ubicacion.model';
import { UbicacionBodegas } from '../../models/ubicacion-bodegas.model';
import { CiudadRequest } from 'src/app/ciudad/models/ciudad-request.model';
import { CiudadService } from 'src/app/ciudad/services/ciudad.service';
import { BodegasService } from '../../services/bodegas.service';
import { Ciudad } from 'src/app/ciudad/models/ciudad.model';
import { IBodega } from '../../models/bodega.model';

@Component({
  selector: 'app-bodega-formulario',
  templateUrl: './bodega-formulario.component.html',
  styleUrls: ['./bodega-formulario.component.scss']
})

export class BodegaFormularioComponent implements OnInit, OnDestroy {
  titulo = 'Administrar Bodegas'
  activo:boolean;
  isLinear = true;
  inactivo:boolean;
  bodegasForm: FormGroup;
  ubicacionesForm: FormGroup;
  ubicacionesDisponibleList: Array<Ubicacion>;
  ubicacionesNoDisponibleList:Array<Ubicacion>;
  ciudades: Array<CiudadRequest>;
  
  constructor(private router:Router, private formBuilder:FormBuilder, private location: Location, private ciudadService: CiudadService, private snackBar: MatSnackBar, private bodegasService: BodegasService) {
    this.buildForm();
  }
  ngOnDestroy(){
    localStorage.removeItem('codigoBodega');
  }
  private buildForm(){
    this.bodegasForm= this.formBuilder.group({
      nombre:['', Validators.required],
      ciudadSelector:['', Validators.required],
      estado:['', Validators.required]
    })
    this.ubicacionesForm = this.formBuilder.group({
      ubicacionesDisponible: [''],
      ubicacionesNoDisponible: ['']
    })
  }
  
  get nombre(){return this.bodegasForm.get('nombre');}
  get ciudadSelector(){return this.bodegasForm.get('ciudadSelector');}
  get estado(){return this.bodegasForm.get('estado');}
  regresar(){
    this.location.back();
  }

  ngOnInit() {
    if(localStorage.getItem('codigoBodega')){
      this.traerBodega(parseInt(localStorage.getItem('codigoBodega')))
    }
    this.ciudadService.obtenerCiudades().subscribe(datos=>this.agregarCiudad(datos), error=>console.log(error))
  }
  traerBodega(id:number){
    this.bodegasService.devuelveBodega(id).subscribe(datos=>this.rellenarBodega(datos), error=>console.log(error))
  }

  rellenarBodega(datos){
    let nombre = datos.datos[0].nombre;
    let estado = datos.datos[0].estado;
    let ciudad = datos.datos[0].ciudad.codigo;
    this.bodegasForm.setValue({
      nombre: nombre,
      estado: estado,
      ciudadSelector: ciudad
    })
    if(estado==true){
      this.activo = true;
      this.inactivo = false;
    }else{
      this.activo = false;
      this.inactivo = true;
    }

  }

  agregarCiudad(datos){
    let ciudad: CiudadRequest;
    this.ciudades = [];
    datos.resultado.forEach(element => {
      ciudad = new CiudadRequest();
      if(element.estado === true){
        ciudad.codigo = element.codigo;
        ciudad.nombre = element.nombre;
        this.ciudades.push(ciudad);
      }
    });
  }

  
  guardarBodega(){
    if(this.bodegasForm.valid){
      let ciudad : Ciudad;
      ciudad = new Ciudad();
      ciudad.codigo = parseInt(this.bodegasForm.value.ciudadSelector);
      ciudad.estado = true;
      ciudad.nombre = ''
      
      var bodega : IBodega;
      if(localStorage.getItem('codigoBodega')){
        bodega = new IBodega(parseInt(localStorage.getItem('codigoBodega')), this.bodegasForm.value.nombre, ciudad, this.bodegasForm.value.estado  )
      }else{
        bodega = new IBodega(0, this.bodegasForm.value.nombre, ciudad, this.bodegasForm.value.estado  )
      }
      this.bodegasService.insertaActualizaBodegas(bodega).subscribe(respuesta=>this.guardarRespuesta(respuesta), error=>console.log(error));
    }else{
      this.openSnackBar('Todos los campos son requeridos', 'Cerrar')
    }
  }
  guardarRespuesta(respuesta){
    
    localStorage.setItem('codigoBodega',respuesta.resultado[0].valor );
    this.cargarUbicaciones(Number.parseInt(localStorage.getItem("codigoBodega")))
  }
  cargarUbicaciones (codigoPerfil:number){
    this.bodegasService.traerUbicacionesDisponibles(codigoPerfil).subscribe(paginas=>this.agregarUbicaciones(paginas), error=>console.log(error));
  }
  agregarUbicaciones(ubicaciones){
    let ubicacion: Ubicacion;
    this.ubicacionesDisponibleList = [];
    this.ubicacionesNoDisponibleList = [];
    
    ubicaciones.resultado.forEach(element => {
      
      if(element.estado === false){
        ubicacion = new Ubicacion(element.codigo, element.descripcion, element.estado);
        this.ubicacionesDisponibleList.push(ubicacion);
      }
      else{
        ubicacion = new Ubicacion(element.codigo, element.descripcion, element.estado);
        this.ubicacionesNoDisponibleList.push(ubicacion)
      }
    });
  }
  pasarUno(){
    if(this.ubicacionesForm.value.ubicacionesDisponible>0){
      let paginaResponse : UbicacionBodegas;
      paginaResponse = new UbicacionBodegas();
      paginaResponse.codigoBui = this.ubicacionesForm.value.ubicacionesDisponible;
      paginaResponse.codigoBod = Number.parseInt(localStorage.getItem("codigoBodega"));
      paginaResponse.estado = true;
      this.bodegasService.insertaUbicaciones(paginaResponse).subscribe(datos=>this.cargarUbicaciones(paginaResponse.codigoBod), error=>console.log(error))
    }
    else{
      this.openSnackBar('Debe seleccionar una página', 'Cerrar')
    }
  }
  regresarUno(){
    if(this.ubicacionesForm.value.paginaNoDisponible>0){
      let paginaResponse : UbicacionBodegas;
      paginaResponse = new UbicacionBodegas();
      paginaResponse.codigoBui = this.ubicacionesForm.value.ubicacionesNoDisponible;
      paginaResponse.codigoBod = Number.parseInt(localStorage.getItem("perfilCodigo"));
      paginaResponse.estado = false;
      this.bodegasService.insertaUbicaciones(paginaResponse).subscribe(datos=>this.cargarUbicaciones(paginaResponse.codigoBod), error=>console.log(error))
    }else{
      this.openSnackBar('Debe seleccionar una página', 'Cerrar')
    }
  }
  recargarPagina(){
    this.router.navigate(['bodegas']);
    this.openSnackBar('Bodega Guardada', 'Cerrar')
  }
  confirmacion(respuesta){
    this.openSnackBar(respuesta.resultado[0].valor, 'Cerrar')
    this.router.navigate(['bodegas']);
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}


