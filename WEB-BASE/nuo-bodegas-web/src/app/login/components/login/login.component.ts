import { Component, OnInit, Input, Output } from '@angular/core';
import { NgForm, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { format } from 'url';

import {MatSnackBar} from '@angular/material/snack-bar';
import { AutenticationService } from '../../service/autentication.service';
import { LoadingScreenService } from '../../../shared/components/loading-screen/service/loading-screen.service';
import { ILogin } from '../../models/login.model';
import { IUsuario } from '../../../usuario/models/usuario.model';





@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private authService: AutenticationService, private router: Router, private snackBar: MatSnackBar, private loadingService: LoadingScreenService, private loadingScreenService:LoadingScreenService ){}
  formGroup: FormGroup ;


  ngOnInit() {
  }

  login(form:NgForm){
    if(form.valid){
      var loginmodel : ILogin;
    loginmodel = new ILogin();
    loginmodel.Usuario = form.value.user;
    loginmodel.Password = form.value.pass;
    this.authService.login(loginmodel).subscribe(objeto=>this.repartirObjetosLogin(objeto),error => this.manejarError(error));
    }else{
      this.openSnackBar("Todos los campos son obligatorios", "Cerrar");
    }
  }


  repartirObjetosLogin(ObjetoLogin){
   
    
    if(ObjetoLogin.codigo == "401" || ObjetoLogin.codigo === "500"){
      this.manejarError(ObjetoLogin)
    }else{
      this.recibirToken(ObjetoLogin.resultado[1]);
      this.recibirUsuario(ObjetoLogin.resultado[0]);
    }
  }
  recibirUsuario(usuario){
    
    var usuarioModel : IUsuario;
    usuarioModel = new IUsuario();
    usuarioModel.Codigo = usuario.codigo;
    usuarioModel.Nombre = usuario.nombre;
    usuarioModel.Apellido = usuario.apellido;
    usuarioModel.Username = usuario.username;
    usuarioModel.EstaActivo = usuario.estaactivo;
    usuarioModel.Correo = usuario.correo;
    localStorage.setItem("usuario_codigo", usuarioModel.Codigo.toString());
    localStorage.setItem("usuario_nombre", usuarioModel.Nombre.toString());
    localStorage.setItem("usuario_apellido", usuarioModel.Apellido.toString());
    localStorage.setItem("usuario_correo", usuarioModel.Correo.toString());
    localStorage.setItem("usuario_ciudad", usuario.ciudad.toString());
    localStorage.setItem("usuario_estado", usuarioModel.EstaActivo);
  }
  
  recibirToken(token) {
    localStorage.setItem('token', token.token);
    localStorage.setItem('tokenExpiration', token.expiracion);
    this.router.navigate(['/home']);
  }

  manejarError(error) {
    try{
    
      if(error.status===404){
        this.openSnackBar("Usuario y contraseña incorrectos", "Cerrar");
      }else{
        this.openSnackBar(error.mensaje, "Cerrar");
      this.authService.logout();

      }

    }catch{
      this.openSnackBar("Usuario o contraseña incorrectas", "Cerrar")
      this.authService.logout();
    }
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }


}
