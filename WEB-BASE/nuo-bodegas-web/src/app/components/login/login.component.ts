import { Component, OnInit, Input, Output } from '@angular/core';
import { NgForm, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { format } from 'url';
import { ILogin } from 'src/app/components/login/models/login.model';
import { AutenticationService } from 'src/app/components/login/service/autentication.service';
import { IUsuario } from 'src/app/components/usuario/models/usuario.model';
import {MatSnackBar} from '@angular/material/snack-bar';
import { LoadingScreenService } from 'src/app/components/loading-screen/service/loading-screen.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private authService: AutenticationService, private router: Router, private _snackBar: MatSnackBar, private _loadingService: LoadingScreenService, private loadingScreenService:LoadingScreenService ){}
  formGroup: FormGroup ;


  ngOnInit() {
  }

  login(form:NgForm){
    if(form.valid){
      this.loadingScreenService.startLoading();
      var loginmodel : ILogin;
    loginmodel = new ILogin();
    loginmodel.Usuario = form.value.user;
    loginmodel.Password = form.value.pass;
    this._loadingService.startLoading();
    this.authService.login(loginmodel).subscribe(objeto=>this.repartirObjetosLogin(objeto),error => this.manejarError(error));
    this.loadingScreenService.stopLoading();
    }else{
      this.openSnackBar("Todos los campos son obligatorios", "Cerrar");
    }
  }


  repartirObjetosLogin(ObjetoLogin){
    this._loadingService.stopLoading();
    
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
      this._loadingService.stopLoading();
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
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }


}
