import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';



@Component({
  selector: 'app-perfil-paginas',
  templateUrl: './perfil-paginas.component.html',
  styleUrls: ['./perfil-paginas.component.scss']
})
export class PerfilPaginasComponent implements OnInit {
  @Input() codigoPerfil;
  constructor() {
    
  }
  
  
  ngOnInit(){

  }

}
