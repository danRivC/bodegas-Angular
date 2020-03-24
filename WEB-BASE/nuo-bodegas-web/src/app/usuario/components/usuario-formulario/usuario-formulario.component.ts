import { Component, OnInit, OnDestroy } from '@angular/core';
import {Location} from '@angular/common';
import {  FormGroup, Validators, FormBuilder } from '@angular/forms';


import {MatSnackBar} from '@angular/material/snack-bar';

import { Router } from '@angular/router';
import { CiudadRequest } from '../../../ciudad/models/ciudad-request.model';
import { CiudadService } from '../../../ciudad/services/ciudad.service';
import { IUsuario } from '../../models/usuario.model';
import { UsuarioService } from '../../service/usuario.service';
import { PerfilResponse } from 'src/app/perfil/models/perfil-response.model';
import { PerfilUsuario } from 'src/app/perfil/models/perfil-usuario.model';




@Component({
  selector: 'app-usuario-formulario',
  templateUrl: './usuario-formulario.component.html',
  styleUrls: ['./usuario-formulario.component.scss']
})
export class UsuarioFormularioComponent implements OnInit, OnDestroy {

  usuario: IUsuario;
  userForm: FormGroup;
  usuarioPerfilForm: FormGroup;
  inactivo: boolean;
  activo: boolean;
  isLinear = true;
  perfilDisponible: Array<any>;
  ciudades: Array<CiudadRequest>;
  perfilNoDisponible: Array<any>;
    constructor(private location: Location, private ciudadService: CiudadService, private snackBar: MatSnackBar, private usuarioService: UsuarioService, private formBuilder: FormBuilder, private route:Router) {
      this.buildForm();
      this.buildFormPerfiles();
     }
     ngOnInit() {
       if(localStorage.getItem('codigoUser')){
        this.usuarioService.obtenerUnUsuario(parseInt(localStorage.getItem('codigoUser'))).subscribe(datos=>this.rellenarUsuario(datos), error=>this.openSnackBar(error, "cerrar"));
       }else{
         this.limpiar()
       }
       this.ciudadService.obtenerCiudades().subscribe(datos=>this.agregarCiudad(datos), error=>console.log(error))
    }
    ngOnDestroy(){
      this.limpiar();
    }
  nombreUsr:string;
  apellidoUsr:string;
  correoUsr:string;
  estadoUsr:boolean;
  usernameUsr:string;
  get ciudadSelector(){return this.userForm.get('ciudadSelector');}


  //declaro el FormGroup de informacion basica
  private buildForm(){
    this.userForm = this.formBuilder.group({
      nombre:['', [Validators.required]],
      apellido:['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      ciudadSelector:['', Validators.required],
        })
  }
  //Cargo Ciudades
  agregarCiudad(datos){
    console.log(datos);
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
  // declaro el FormGroup de asignacion de perfiles
  private buildFormPerfiles(){
    this.usuarioPerfilForm = this.formBuilder.group({
      perfilesDisponibles: [''],
      perfilesNoDisponibles: ['']
    })
  }


  //Cargar Perfiles Disponibles y asignados
  cargarPerfiles(codigoUser:number){
    this.usuarioService.obtenerPerfilesUsuario(Number.parseInt(localStorage.getItem('codigoUser'))).subscribe(perfiles=>this.rellenarPerfiles(perfiles), error=>console.log(error))
  }
  rellenarPerfiles(perfiles){
    
    this.perfilDisponible = [];
    this.perfilNoDisponible = [];
    let perfilResponse: PerfilResponse;
    perfiles.resultado.forEach(perfil => {
      perfilResponse = new PerfilResponse();
      if(perfil.estado === 0){
        perfilResponse.codigo = perfil.codigoPus;
        perfilResponse.nombre = perfil.nombrePus;
        this.perfilDisponible.push(perfilResponse);
      }else{
    
        perfilResponse.codigo =perfil.codigoPus;
        perfilResponse.nombre = perfil.nombrePus;
        this.perfilNoDisponible.push(perfilResponse);
      }
    });

  }




  titulo="Administrar Usuario"
  regresar() {
    this.location.back();
    this.limpiar();
  }
  get nombre(){return this.userForm.get('nombre');}
  get correo(){return this.userForm.get('correo');}
  get apellido(){return this.userForm.get('apellido');}
  get username(){return this.userForm.get('username');}
  get estado(){return this.userForm.get('estado')}

  guardar(){
    if(this.userForm.valid){
      if(this.comprobarExisteUser()){
        this.usuario = new IUsuario();
        this.usuario.Codigo = parseInt(localStorage.getItem('codigoUser')) ;
        this.usuario.Nombre = this.userForm.value.nombre;
        this.usuario.Apellido = this.userForm.value.apellido;
        this.usuario.Correo = this.userForm.value.correo;
        this.usuario.Username = this.userForm.value.username;
        this.usuario.EstaActivo = this.userForm.value.estado;
        this.usuario.Ciudad = this.userForm.value.ciudadSelector;
      }else{
        this.usuario = new IUsuario();
        this.usuario.Codigo = 0 ;
        this.usuario.Nombre = this.userForm.value.nombre;
        this.usuario.Apellido = this.userForm.value.apellido;
        this.usuario.Correo = this.userForm.value.correo;
        this.usuario.Username = this.userForm.value.username;
        this.usuario.EstaActivo = this.userForm.value.estado;
        this.usuario.Ciudad = this.userForm.value.ciudadSelector;
      }
      this.usuarioService.guardarUsuario(this.usuario).subscribe(confirmacion=>this.confirmacion(confirmacion),
      error=>(this.openSnackBar(error ,"Cerrar")))
    }else{
      this.openSnackBar("Todos los campos son obligatorios", "Cerrar");
    }
  }

  confirmacion(confirmacion){
    
    if(confirmacion.datos[0].valor==='El usuario ya existe'){
      this.openSnackBar(confirmacion.datos[0].valor, 'Cerrar');
      this.userForm.invalid;
    }else{
      if(confirmacion.datos[0].valor===''){
        this.openSnackBar(confirmacion.mensaje, 'Cerrar');
        this.cargarPerfiles(Number.parseInt(localStorage.getItem('codigoUser')));
      }else{
        this.openSnackBar(confirmacion.mensaje, 'Cerrar');
        localStorage.setItem('codigoUser', confirmacion.datos[0].valor);
        this.cargarPerfiles(Number.parseInt(confirmacion.datos[0].valor));
      }
    }
  }

  comprobarExisteUser(){
    if(localStorage.getItem("codigoUser")){
      return true;
    }
    else{
      return false;
    }
  }
  limpiar(){
    this.userForm.reset();
    localStorage.removeItem('codigoUser');
  }

  rellenarUsuario(usuario){
    var usuarioModel: IUsuario;
    usuarioModel = new IUsuario;
    console.log(usuario)
    usuarioModel.Codigo = usuario.resultado[0].codigo;
    usuarioModel.Nombre = usuario.resultado[0].nombre;
    usuarioModel.Apellido = usuario.resultado[0].apellido;
    usuarioModel.Username = usuario.resultado[0].username;
    usuarioModel.EstaActivo = usuario.resultado[0].estaActivo;
    usuarioModel.Correo = usuario.resultado[0].correo;
    usuarioModel.Ciudad = usuario.resultado[0].ciudad;
    this.userForm.setValue({
      nombre: usuarioModel.Nombre,
      apellido: usuarioModel.Apellido,
      correo: usuarioModel.Correo,
      username: usuarioModel.Username,
      ciudadSelector: usuarioModel.Ciudad,
      estado: usuarioModel.EstaActivo === 'Activo' ? true: false
    });
    if(usuarioModel.EstaActivo === 'Activo'){
      this.activo = true;
      this.inactivo = false;
    }else{
      this.inactivo = true;
      this.activo=false;
    }
    
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
  pasarUno(){
    let usuarioModel:PerfilUsuario;
    usuarioModel = new PerfilUsuario();
    if(this.usuarioPerfilForm.value.perfilesDisponibles>0){
      usuarioModel.codigoPus= this.usuarioPerfilForm.value.perfilesDisponibles;
      usuarioModel.estaActivoPur = 1;
      usuarioModel.codigoUser = parseInt(localStorage.getItem('codigoUser'));
    
      this.usuarioService.insertarActualizarPerfilUsuario(usuarioModel).subscribe(datos=>console.log(datos), error=>console.log(error));
      this.cargarPerfiles(parseInt(localStorage.getItem('codigoUser')));

    }else{
      this.openSnackBar('Debe seleccionar un perfil disponible', 'Cerrar')
    }
  }
  regresarUno(){
    let usuarioModel:PerfilUsuario;
    usuarioModel = new PerfilUsuario();
    if(this.usuarioPerfilForm.value.perfilesNoDisponibles>0){
      usuarioModel.codigoPus= this.usuarioPerfilForm.value.perfilesNoDisponibles;
      usuarioModel.estaActivoPur = 0;
      usuarioModel.codigoUser = Number.parseInt(localStorage.getItem('codigoUser'));
      
      this.usuarioService.insertarActualizarPerfilUsuario(usuarioModel).subscribe(respuesta=>console.log(respuesta), error=>console.log(error));
      this.cargarPerfiles(Number.parseInt(localStorage.getItem('codigoUser')));

    }else{
      this.openSnackBar('Debe seleccionar un perfil asignado', 'Cerrar')
    }
  }

  recargarPagina(){
    this.route.navigate(['usuarios']);
    this.openSnackBar('Usuario Guardado', 'Cerrar')
  }



}
