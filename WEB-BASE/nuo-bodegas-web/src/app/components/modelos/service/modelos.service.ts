import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Modelos } from '../models/modelos.model';

@Injectable({
  providedIn: 'root'
})
export class ModelosService {

  constructor(private http:HttpClient, private router:Router) { }
  private apiUrl = environment.BASE_API_URL;
  devuelveListaModelos(){
    return this.http.get(this.apiUrl+'modelos');
  }
  insertaActualizaModelo(modelo:Modelos){
    return this.http.post(this.apiUrl+'modelos', modelo);
  }

  devuelveModelo(codigo:number){
    return this.http.get(this.apiUrl+'modelos/'+codigo);
  }
}
