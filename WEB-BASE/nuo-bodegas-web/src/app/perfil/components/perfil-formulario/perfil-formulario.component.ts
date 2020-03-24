import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {Location} from '@angular/common';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Ubicacion } from '../../../ubicacion/models/ubicacion.model';

import { PerfilService } from '../../service/perfil.service';
import { IPerfil } from '../../models/perfil.model';
import { PaginaPerfil } from 'src/app/base/components/pagina/models/pagina-perfil.model';
import { PaginaResponse } from 'src/app/base/components/pagina/models/pagina-response.model';



@Component({
  selector: 'app-perfil-formulario',
  templateUrl: './perfil-formulario.component.html',
  styleUrls: ['./perfil-formulario.component.scss']
})
export class PerfilFormularioComponent implements OnInit, OnChanges, OnDestroy {
  activo : boolean = false;
  inactivo:boolean = false;
  isLinear = true;
  perfilForm: FormGroup;
  perfilPaginaForm: FormGroup;
  paginaDisponibleList: Array<PaginaPerfil>;
  PaginaNoDisponibleList:Array<PaginaPerfil>;
  tienePaginas :boolean = false ;


  titulo = 'Administrar Perfil';
  constructor(private router:Router ,private formBuilder: FormBuilder, private location: Location, private perfilService: PerfilService, private snackBar: MatSnackBar) {
    this.buildForm();
    this.buildPaginasForm();
  }
  regresar(){
    this.location.back();
  }
  ngOnDestroy(){
    this.limpiar();
  }

  private buildForm(){
    this.perfilForm = this.formBuilder.group({
      nombre:['', [Validators.required, Validators.min]],
      descripcion:['', [Validators.required]],
      estado: ['', [Validators.required]]
        });
  }
  private buildPaginasForm(){
    this.perfilPaginaForm = this.formBuilder.group({
      paginaDisponible:[''],
      paginaNoDisponible:['']
    })
  }

  //Validacion personalizada de la asignacion de paginas
  private tienePaginasAsignadas(){
    let validado: boolean
    validado = localStorage.getItem('tienePaginas')==='true'?true:false;
    
    if(validado){
      validado = true;
    }else{
      validado= null;
    }
    return validado
  }
  //instancio variables para validar en tiempo real los campos del formulario de asignacion de paginas
  get paginaNoDisponible(){return this.perfilPaginaForm.get('paginaNoDisponible');}

  paginaList: string[];

  ngOnInit() {
    this.perfilForm = new FormGroup({
      nombre : new FormControl(),
      descripcion: new FormControl(),
      estado: new FormControl()
    })
    if(localStorage.getItem('perfilCodigo')){
      let codigo = localStorage.getItem('perfilCodigo')
      this.perfilService.cargarPerfil(Number.parseInt(codigo)).subscribe(datos=>this.rellenarPerfil(datos), error=>console.log(error))
    }
  }
  ngOnChanges(){

  }
  //Cargar Paginas por perfil
  cargarPaginas (codigoPerfil:number){
    this.perfilService.traerPaginasDisponibles(codigoPerfil).subscribe(paginas=>this.agregarPaginas(paginas), error=>console.log(error));

  }

  //Guardar Datos de perfil
  guardarDatosPerfil(){
    if(this.perfilForm.valid){
      var perfil = new IPerfil();
      var codigo: number;
      if(localStorage.getItem("perfilCodigo")){
        codigo = Number.parseInt(localStorage.getItem("perfilCodigo"));
      }else{
        codigo = 0;
      }
      perfil.Nombre = this.perfilForm.value.nombre;
      perfil.Descripcion = this.perfilForm.value.descripcion;
      perfil.EstaActivo = this.perfilForm.value.estado;
      perfil.Codigo = codigo;
      this.perfilService.guardarPerfil(perfil).subscribe(respuesta => this.guardarRespuesta(respuesta), error => this.manejarError(error));
      this.buildPaginasForm();
    }
  }


  guardarRespuesta(respuesta){
    
    localStorage.setItem('perfilCodigo',respuesta.resultado[0].valor );
    this.cargarPaginas(Number.parseInt(localStorage.getItem("perfilCodigo")))
  }


  rellenarPerfil(datos){
    
    this.perfilForm.setValue({
      nombre: datos.resultado[0].nombre,
      descripcion: datos.resultado[0].descripcion,
      estado: datos.resultado[0].estaActivo === 'True' ? true: false
    })
    if(datos.resultado[0].estaActivo === 'True'){
      this.activo = true;
      this.inactivo = false;
    }else{
      this.activo=false;
      this.inactivo=true;
    }
  }
  limpiar(){
    this.perfilForm.reset();
    localStorage.removeItem("perfilCodigo")
  }

  agregarPaginas(paginas){
    var paginasmodel: PaginaPerfil;
    this.paginaDisponibleList = [];
    this.PaginaNoDisponibleList = [];
    paginas.datos.forEach(element => {
      paginasmodel = new PaginaPerfil();
      if(element.estadoMpe === 0){
        paginasmodel.codigo = element.codigoPag;
        paginasmodel.nombre = element.nombrePag;
        this.paginaDisponibleList.push(paginasmodel);
      }
      else{
        paginasmodel.codigo = element.codigoPag;
        paginasmodel.nombre = element.nombrePag;
        this.PaginaNoDisponibleList.push(paginasmodel)
      }
    });
    if(this.PaginaNoDisponibleList.length > 0){
      localStorage.setItem('tienePaginas', 'true');
    }else{
      localStorage.setItem('tienePaginas', 'false');
    }
  }
  manejarError(error: string){
    this.openSnackBar(error, 'Cerrar')
  }
  pasarUno(){
    if(this.perfilPaginaForm.value.paginaDisponible>0){
      let paginaResponse : PaginaResponse;
      paginaResponse = new PaginaResponse();
      paginaResponse.codigoPagina = this.perfilPaginaForm.value.paginaDisponible;
      paginaResponse.codigoPerfil = Number.parseInt(localStorage.getItem("perfilCodigo"));
      paginaResponse.estadoMpe = 1;
      this.perfilService.insertarActualizarPagina(paginaResponse).subscribe(datos=>this.cargarPaginas(paginaResponse.codigoPerfil), error=>console.log(error))

    }
    else{
      this.manejarError('Debe seleccionar una página')
    }
  }
  regresarUno(){
    if(this.perfilPaginaForm.value.paginaNoDisponible>0){
      let paginaResponse : PaginaResponse;
      paginaResponse = new PaginaResponse();
      paginaResponse.codigoPagina = this.perfilPaginaForm.value.paginaNoDisponible;
      paginaResponse.codigoPerfil = Number.parseInt(localStorage.getItem("perfilCodigo"));
      paginaResponse.estadoMpe = 0;
      this.perfilService.insertarActualizarPagina(paginaResponse).subscribe(datos=>this.cargarPaginas(paginaResponse.codigoPerfil), error=>console.log(error))
    }else{
      this.manejarError('Debe seleccionar una página')
    }
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  recargarPagina(){
    this.router.navigate(['perfiles']);
    this.openSnackBar('Perfil Guardado', 'Cerrar')
  }
}
