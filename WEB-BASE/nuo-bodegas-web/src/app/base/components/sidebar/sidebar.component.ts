import { Component, OnInit } from '@angular/core';
import { PaginasService } from '../pagina/service/paginas.service';



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private paginasService:PaginasService) { }
  private codigouser= localStorage.getItem("usuario_codigo");
  paginas;
  ngOnInit() {
    this.paginasService.obtenerPaginas(parseInt(this.codigouser), 'true' ).subscribe(paginas=>this.obtenerPaginas(paginas), error=>this.manejarError(error));
  }
  obtenerPaginas(pagina){
    this.paginas = pagina.resultado;
    
  }
  manejarError(error) {
    alert(error.mensaje);
    console.log(error);
  }

}
