import { Component, OnInit, Input, Output } from '@angular/core';
import { NgForm, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { format } from 'url';
import { ILogin } from 'src/app/models/login.model';
import { AutenticationService } from 'src/app/core/autentication.service';
import { IUsuario } from 'src/app/models/usuario.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private authService: AutenticationService, private router: Router) {}
  formGroup: FormGroup ;


  ngOnInit() {
  }

  login(form:NgForm){
    var loginmodel : ILogin;
    loginmodel = new ILogin();
    loginmodel.Usuario = form.value.user;
    loginmodel.Password = form.value.pass;
    this.authService.login(loginmodel).subscribe(objeto=>this.repartirObjetosLogin(objeto),error => this.manejarError(error));
  }


  repartirObjetosLogin(ObjetoLogin){
    console.log(ObjetoLogin)
    if(ObjetoLogin.codigo == "401"){
      alert(ObjetoLogin.mensaje);
      this.authService.logout();
    }else{
      this.recibirToken(ObjetoLogin.resultado[1]);
      this.recibirUsuario(ObjetoLogin.resultado[0]);
    }
  }
  recibirUsuario(usuario){
    var usuarioModel : IUsuario;
    usuarioModel = new IUsuario();
    console.log(usuario);
    usuarioModel.Codigo = usuario.codigo;
    usuarioModel.Nombre = usuario.nombre;
    usuarioModel.Apellido = usuario.apellido;
    usuarioModel.Username = usuario.username;
    usuarioModel.EstaActivo = usuario.estaactivo;
    usuarioModel.Correo = usuario.correo;
    localStorage.setItem("usuario_codigo", usuarioModel.Codigo.toString())
    localStorage.setItem("usuario_nombre", usuarioModel.Nombre.toString())
    localStorage.setItem("usuario_apellido", usuarioModel.Apellido.toString())
    localStorage.setItem("usuario_correo", usuarioModel.Correo.toString())
    localStorage.setItem("usuario_estado", usuarioModel.EstaActivo.toString())
  }

  recibirToken(token) {
    localStorage.setItem('token', token.token);
    localStorage.setItem('tokenExpiration', token.expiracion);
    this.router.navigate(['/home']);
  }
  manejarError(error) {
    
      alert(error.mensaje[""]);
      this.authService.logout();
      console.log("entro en error");
    
  }


}
