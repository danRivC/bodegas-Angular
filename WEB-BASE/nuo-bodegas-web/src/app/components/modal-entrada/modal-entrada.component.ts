import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Producto } from '../producto/models/producto.model';
import { BodegasService } from '../bodega/services/bodegas.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalEntrada } from './models/modal-entrada.model';
import { ModalEntradaService } from './service/modal-entrada.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-modal-entrada',
  templateUrl: './modal-entrada.component.html',
  styleUrls: ['./modal-entrada.component.scss']
})
export class ModalEntradaComponent implements OnInit  {
  constructor(
    public dialogRef: MatDialogRef<ModalEntradaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IProducto, 
    private bodegaService:BodegasService, private formBuilder:FormBuilder, 
    private entradaService:ModalEntradaService,
    private _snackBar: MatSnackBar) {
      this.buildForm();
    }
    producto= this.data.nombre
  ubicaciones: Array<any>;
  bodegas: Array<any>;
  entradaForm: FormGroup;
  private buildForm(){
    this.entradaForm= this.formBuilder.group({
      ubicacionSelector:['', Validators.required],
      bodegaSelector: ['', Validators.required],
      descripcion:['', Validators.required],
      cantidad:['',[Validators.required, Validators.pattern('[0-9]*')]]
    })
  }
  get bodegaSelector(){return this.bodegaSelector.get('bodegaSelector');}
  get ubicacionSelector(){return this.entradaForm.get('ubicacionSelector');}
  get descripcion(){return this.entradaForm.get('descripcion')}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(){
    this.bodegaService.devuelveBodegasPorCiudad(parseInt(localStorage.getItem('usuario_ciudad'))).subscribe(datos=>this.agregarBodegasSelect(datos));
    if(this.entradaForm.value.bodegaSelector > 0){
      this.bodegaService.traerUbicacionesDisponibles(this.entradaForm.value.bodegaSelector).subscribe(datos=>this.agregarUbicacion(datos));
      this.ubicacionSelector.enable();
    }
  }
  traerUbicacion(ob){
    let bodega = ob.value
    if(bodega > 0){
      this.bodegaService.traerUbicacionesDisponibles(bodega).subscribe(datos=>this.agregarUbicacion(datos));
      this.ubicacionSelector.enable();
    }else{
      this.ubicacionSelector.disable();
    }
  }
  agregarUbicacion(datos){
    let dato: IdatoSelect;
    this.ubicaciones = [];
    datos.resultado.forEach(element => {
      dato = new IdatoSelect();
      if(element.estado === true){
        dato.codigo = element.codigo;
        dato.nombre = element.descripcion;
        this.ubicaciones.push(dato);
      }
    });
  }
  agregarBodegasSelect(datos){
    let dato: IdatoSelect;
    this.bodegas = [];
    datos.resultado.forEach(element => {
      dato = new IdatoSelect();
      if(element.estado === true){
        dato.codigo = element.codigo;
        dato.nombre = element.nombre;
        this.bodegas.push(dato);
      }
    });
  }
  guardar(){
    
    if(this.entradaForm.valid){
      
      let entrada:ModalEntrada;
      let bodega = this.entradaForm.value.bodegaSelector;
      let ubicaicon = this.entradaForm.value.ubicacionSelector;
      let descripcion = this.entradaForm.value.descripcion;
      let cantidad = parseInt(this.entradaForm.value.cantidad);
      let producto = this.data.codigo;
      entrada = new ModalEntrada(0, producto, bodega, cantidad, descripcion,ubicaicon);
      console.log(entrada);
      this.entradaService.insertarEntrada(entrada).subscribe(datos=>console.log(datos), eror=>console.log(eror));
      this.dialogRef.close();
      this.openSnackBar("Ingreso registrado exitosamente", "Cerrar");
    }
    else{
      this.openSnackBar("El formulario no es válido", "Cerrar");

    }
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
class IProducto{
  codigo:number;
  nombre:string;
  parte:string;
  serie:string;
  tipo:string;
  modelo:string;
  bodega:string;
  proveedor:string;
  estado:string;
  ubicacion:string;
}
class IdatoSelect{
  codigo:number;
  nombre: string;
}
