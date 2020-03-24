import { Injectable } from '@angular/core';
import { ModalSalida } from '../models/modal-salida.model';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ModalSalidaService {

  constructor(private http:HttpClient, private router:Router) { }
  private apiUrl = environment.BASE_API_URL
  insertarDespacho(despacho: ModalSalida){
    return this.http.post(this.apiUrl+'despacho', despacho);
  }
}
