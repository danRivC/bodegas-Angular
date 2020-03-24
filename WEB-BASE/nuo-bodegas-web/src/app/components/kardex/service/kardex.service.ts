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
  obtenerMovimientosProductoKardex(kardex:Kardex){
    return this.http.post(this.apiUrl+'kardex', kardex);
  }
}
