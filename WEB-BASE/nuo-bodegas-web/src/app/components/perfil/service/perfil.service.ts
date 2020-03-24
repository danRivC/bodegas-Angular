import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { IPerfil } from '../models/perfil.model';
import { PaginaResponse } from '../../pagina/models/pagina-response.model';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor(private http:HttpClient, private router:Router) { }
  private apiUrl = environment.BASE_API_URL

  traerPerfiles(){
    return this.http.get(this.apiUrl+'perfil')
  }
  cargarPerfil(codigo: number){
    return this.http.get(this.apiUrl+'perfil/'+codigo);
  }
  guardarPerfil(perfil:IPerfil){
    return this.http.post(this.apiUrl+'perfil', perfil);
  }
  traerPaginasDisponibles(id:number){
    return this.http.get(this.apiUrl+'perfil/paginas/'+id);
  }
  insertarActualizarPagina(paginaResponse: PaginaResponse){
    return this.http.post(this.apiUrl+'perfil/paginas', paginaResponse)
  }

}
