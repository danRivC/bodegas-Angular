import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Proveedor } from '../models/proveedor.model';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  constructor(private http:HttpClient, private router:Router) { }
  private apiUrl = environment.BASE_API_URL;
  obtenerProveedores(){
    return this.http.get(this.apiUrl+'proveedores');
  }
  insertaActualizaProveedor(proveedor:Proveedor){
    return this.http.post(this.apiUrl+'proveedores', proveedor);
  }
  devuelveProveedor(codigo:number){
    return this.http.get(this.apiUrl+'proveedores/'+codigo);
  }
}
