import { Component, OnInit, Input } from '@angular/core';
import { IPagina } from 'src/app/components/pagina/models/pagina.model';

@Component({
  selector: 'app-pagina',
  templateUrl: './pagina.component.html',
  styleUrls: ['./pagina.component.scss']
})
export class PaginaComponent implements OnInit {

  constructor() { }
  @Input() pagina : IPagina;
  ngOnInit() {


  }

}
