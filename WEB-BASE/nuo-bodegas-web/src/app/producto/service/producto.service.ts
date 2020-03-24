import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Producto } from '../models/producto.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http:HttpClient, private router:Router) { }
  private apiUrl = environment.BASE_API_URL
  obtenerProductos(){
    return this.http.get(this.apiUrl+'productos/');
  }
  insertarActualizarProducto(producto:Producto){
    return this.http.post(this.apiUrl+'productos', producto);
  }
  traerProducto(codigo:number){
    return this.http.get(this.apiUrl+'productos/'+codigo);
  }

  traerCantidad(bodega: number, ubicacion:number, producto:number){
    return this.http.get(`${this.apiUrl}productos/cantidad/${bodega}/${ubicacion}/${producto}`)
  }
}
