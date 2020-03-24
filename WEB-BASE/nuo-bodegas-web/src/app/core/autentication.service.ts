import { Injectable, Inject } from '@angular/core';
import {Observable} from 'rxjs';
import { IUsuario } from '../models/usuario.model';
import { ILogin } from '../models/login.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AutenticationService {

    constructor(private http:HttpClient, private router:Router){ }


    private apiUrl = environment.BASE_API_URL

    login(login: ILogin){
        console.log(this.apiUrl+'login', login);
        return this.http.post(this.apiUrl+'login', login);
    }


    obtenerToken():string{
        return localStorage.getItem("token");
    }


    obtenerExpiracionToken():string{
        return localStorage.getItem("tokenExpiration");
    }

    logout(){
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiration");
        localStorage.removeItem("usuario_nombre");
        localStorage.removeItem("usuario_apellido");
        localStorage.removeItem("usuario_codigo");
        localStorage.removeItem("usuario_correo");
        this.router.navigate(['/login']);
    }

    estaLogueado():boolean{
        var exp = this.obtenerExpiracionToken();
        if(!exp){
            return false;
        }
        var now = new Date();
        var dateExp = new Date(exp);
        
        


        if (now.getTime() >= dateExp.getTime()) {
            // ya expiró el token
            localStorage.removeItem('token');
            localStorage.removeItem('tokenExpiration');
            return false;
        } else {
            
            return true;
            
        }
    }
}
