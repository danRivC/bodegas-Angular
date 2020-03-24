import { Component, OnInit, ViewChild } from '@angular/core';
import { BodegasService } from 'src/app/components/bodega/services/bodegas.service';
import { IBodega } from 'src/app/components/bodega/models/bodega.model';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { LoadingScreenService } from 'src/app/components/loading-screen/service/loading-screen.service';

@Component({
  selector: 'app-bodega',
  templateUrl: './bodega.component.html',
  styleUrls: ['./bodega.component.scss']
})
export class BodegaComponent implements OnInit {
  titulo = 'Bodegas';
  constructor(private _bodegasService: BodegasService, private router:Router, private loadingScreenService:LoadingScreenService) { }
  dataSource = new MatTableDataSource<IBodegaDataSource>();
  bodegas : Array<IBodegaDataSource>;
  @ViewChild(MatPaginator, {static:true}) paginador: MatPaginator;
  displayColumns: string[] = ['codigo', 'nombre', 'ciudad', 'estado', 'actions'];
  ngOnInit(){
    this.traerBodegas();
    this.dataSource.paginator = this.paginador
    }
  traerBodegas(){
    this.loadingScreenService.startLoading();
    this._bodegasService.devuelveListaBodegas().subscribe(datos=>this.asignarBodegas(datos), error=>console.log(error));
    this.loadingScreenService.stopLoading();
  }
  nuevo(){
    localStorage.removeItem('codigoBodega')
    this.router.navigate(['bodegas/administrar-bodegas'])
  }
  guardarBodega(codigoBodega:number){
    localStorage.setItem('codigoBodega', codigoBodega.toString());
    this.router.navigate(['bodegas/administrar-bodegas'])

  }
  asignarBodegas(datos){
    let bodega:IBodegaDataSource;
    this.bodegas = []
    datos.resultado.forEach(element => {
      bodega = new IBodegaDataSource();
      bodega.codigo = element.codigo;
      bodega.nombre = element.nombre;
      bodega.estado = element.estado=== true?'Activo': 'Inactivo';
      bodega.ciudad = element.ciudad.nombre;
      
      this.bodegas.push(bodega);
    });
    this.dataSource.data = this.bodegas;
    
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
class IBodegaDataSource{
  public codigo:number;
  public ciudad:string;
  public nombre: string;
  public estado: string;
}