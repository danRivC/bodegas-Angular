import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalidaService {

  constructor(private http:HttpClient, private router:Router) { }
  private apiUrl = environment.BASE_API_URL
  obtenerDetalle(id:number){
    return this.http.get(this.apiUrl+'despacho/detalle/'+id);
  }
}
