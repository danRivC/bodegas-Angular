import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { IUsuario } from '../models/usuario.model';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient, private router:Router) { }
  private apiUrl = environment.BASE_API_URL;

  public obtenerTodosUsuarios(username:string, estado: boolean){
    return this.http.get(this.apiUrl+'usuario/'+estado+'/'+username);
  }

  public guardarUsuario(usuario: IUsuario){
    return this.http.post(this.apiUrl+"usuario", usuario);
  }
  public obtenerUnUsuario(id:number){
    return this.http.get(this.apiUrl+'usuario/buscar/'+id);
  }


}
