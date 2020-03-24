import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Kardex } from '../models/kardex.model';

@Injectable({
  providedIn: 'root'
})
export class KardexService {

  constructor(private http:HttpClient, private router:Router) { }
  private apiUrl = environment.BASE_API_URL;

  obtenerProductosKardex(id:number){
    return this.http.get(this.apiUrl+'kardex/'+id);
  }
  obtenerMovimientosProductoKardex(bodega:number, codigo:number,fecha_inicio:string, fecha_final:string){
    if(fecha_inicio != null && fecha_final != null){
      return this.http.get(`${this.apiUrl}kardex/detalle/${bodega}/${codigo}/${fecha_inicio}/${fecha_final}`);
    }else{
      return this.http.get(`${this.apiUrl}kardex/detalle/${bodega}/${codigo}`)
    }
  }
}
