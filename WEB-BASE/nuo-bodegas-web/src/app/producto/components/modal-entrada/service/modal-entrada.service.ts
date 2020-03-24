import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ModalEntrada } from '../models/modal-entrada.model';

@Injectable({
  providedIn: 'root'
})
export class ModalEntradaService {
  constructor(private http:HttpClient, private router:Router) { }
  private apiUrl = environment.BASE_API_URL
  insertarEntrada(entrada: ModalEntrada){
    return this.http.post(this.apiUrl+'entrada', entrada);
  }
}
