import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ModalMovimiento } from '../models/modal-movimiento.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ModalMovimientoService {

  constructor(private http:HttpClient, private router:Router) { }
  private apiUrl = environment.BASE_API_URL
  insertarMovimiento(movimiento: ModalMovimiento){
    return this.http.post(this.apiUrl+'movimientos', movimiento);
  }
}
