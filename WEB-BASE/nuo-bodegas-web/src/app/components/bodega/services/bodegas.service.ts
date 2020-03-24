import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { IBodega } from '../models/bodega.model';
import { UbicacionBodegas } from '../models/ubicacion-bodegas.model';

@Injectable({
  providedIn: 'root'
})
export class BodegasService {

  constructor( private http:HttpClient, private router:Router) { }
  private apiUrl = environment.BASE_API_URL
  devuelveListaBodegas(){
    return this.http.get(this.apiUrl+'bodega');
  }
  insertaActualizaBodegas(bodega:IBodega){
    return this.http.post(this.apiUrl+'bodega', bodega);
  }
  devuelveBodega(id:number){
    return this.http.get(this.apiUrl+'bodega/'+id )
  }
  traerUbicacionesDisponibles(id:number){
    return this.http.get(this.apiUrl+'ubicacion/bodegas/'+id);
  }
  traerUbicacionesProductoBodega(bodega:number, producto:number){
    return this.http.get(`${this.apiUrl}ubicacion/movimiento/${bodega}/${producto}`)
  }

  insertaUbicaciones(ubicacion: UbicacionBodegas){
    return this.http.post(this.apiUrl+'bodega/ubicaciones', ubicacion)
  }
  devuelveBodegasPorProducto(id:number){
    return this.http.get(this.apiUrl+'bodega/producto/'+id);
  }
  devuelveBodegasPorCiudad(id:number){
    return this.http.get(this.apiUrl+'bodega/ciudad/'+id);
  }
  devuelveBodegasPorCiudadProducto(ciudad:number, producto:number){
    return this.http.get(`${this.apiUrl}bodega/movimiento/${ciudad}/${producto}`)
  }


}
