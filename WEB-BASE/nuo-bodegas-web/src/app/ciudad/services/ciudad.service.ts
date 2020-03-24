import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CiudadRequest } from '../models/ciudad-request.model';
import { element } from 'protractor';
import { Ciudad } from '../models/ciudad.model';

@Injectable({
  providedIn: 'root'
})
export class CiudadService {
  
  constructor(private http:HttpClient, private router:Router) { }
  private apiUrl = environment.BASE_API_URL
  obtenerCiudades(){
    return this.http.get(this.apiUrl+'ciudad/');
  }
  insertarActualizarCiudad(ciudad:Ciudad){
    return this.http.post(this.apiUrl+'ciudad', ciudad);
  }

  traerCiudad(codigo:number){
    return this.http.get(this.apiUrl+'ciudad/'+codigo);
  }


  
}
