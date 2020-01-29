import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class PaginasService {

  constructor(private http:HttpClient, private router:Router) { }
  private apiUrl = environment.BASE_API_URL
  obtenerPaginas(id:number, estaActivo:string){
    return this.http.get(this.apiUrl+"paginas/"+id+"/"+estaActivo )
  }
}
