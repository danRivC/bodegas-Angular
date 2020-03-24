import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor() { }
  ngOnInit() {
  }
  titulo=`Bienvenid@ ${localStorage.getItem('usuario_nombre')} ${localStorage.getItem('usuario_apellido')}`;
}
