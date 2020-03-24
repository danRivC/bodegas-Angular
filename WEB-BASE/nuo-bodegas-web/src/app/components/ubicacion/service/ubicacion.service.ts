import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Ubicacion } from '../models/ubicacion.model';

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {

  constructor(private http:HttpClient, private router:Router) { }
  private apiUrl = environment.BASE_API_URL
  obtenerUbicaciones(){
    return this.http.get(this.apiUrl+'ubicacion/');
  }
  insertarActualizarUbicaciones(ubicacion:Ubicacion){
    return this.http.post(this.apiUrl+'ubicacion', ubicacion);
  }

  traerUbicacion(codigo:number){
    return this.http.get(this.apiUrl+'ubicacion/'+codigo);
  }
  traerUbicacionesBodega(codigo:number){
    return this.http.get(this.apiUrl+'ubicacion/bodegas/'+codigo);
  }

  
}
