import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TipoProducto } from '../models/tipo-producto.model';

@Injectable({
  providedIn: 'root'
})
export class TipoProductoService {

  constructor(private http:HttpClient, private router:Router) { }
  private apiUrl = environment.BASE_API_URL
  obtenerTipos(){
    return this.http.get(this.apiUrl+'tipo/');
  }
  insertarActualizarTipo(tipo:TipoProducto){
    return this.http.post(this.apiUrl+'tipo', tipo);
  }

  traerTipo(codigo:number){
    return this.http.get(this.apiUrl+'tipo/'+codigo);
  }
}
