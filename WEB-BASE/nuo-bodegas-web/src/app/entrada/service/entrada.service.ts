import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EntradaService {

  constructor(private http:HttpClient, private router:Router) { }
  private apiUrl = environment.BASE_API_URL
  obtenerDetalle(id:number, fecha_inicio, fecha_final){
    if(fecha_inicio != null && fecha_final != null){
      return this.http.get( `${this.apiUrl}entrada/detalle/${id}/${fecha_inicio}/${fecha_final}` );
    }else{
      return this.http.get( `${this.apiUrl}entrada/detalle/${id}` );
    }
  }
}
