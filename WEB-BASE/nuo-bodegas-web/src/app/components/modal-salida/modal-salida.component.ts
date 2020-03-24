import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { ModalEntradaComponent } from '../modal-entrada/modal-entrada.component';
import { BodegasService } from '../bodega/services/bodegas.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalMovimientoService } from '../modal-movimiento/service/modal-movimiento.service';
import { ModalSalidaService } from './service/modal-salida.service';
import { ModalSalida } from './models/modal-salida.model';
import { ProductoService } from '../producto/service/producto.service';

@Component({
  selector: 'app-modal-salida',
  templateUrl: './modal-salida.component.html',
  styleUrls: ['./modal-salida.component.scss']
})
export class ModalSalidaComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalEntradaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IProducto, 
    private bodegaService:BodegasService, private formBuilder:FormBuilder, 
    private despachoService: ModalSalidaService,
    private _snackBar: MatSnackBar,
    private productoService: ProductoService) {
      this.buildForm();
    }
    producto= this.data.nombre
    cantidad:number = 0;
    bodegaSeleccionada: number;
    ubicaciones: Array<any>;
    bodegas: Array<any>;
    despachoForm: FormGroup;
    private buildForm(){
      this.despachoForm= this.formBuilder.group({
        ubicacionSelector:['', Validators.required],
        bodegaSelector: ['', Validators.required],
        descripcion:['', Validators.required],
        cantidad:['',[Validators.required, Validators.pattern('[0-9]*')]],
      })
    }
    get bodegaSelector(){return this.despachoForm.get('bodegaSelector');}
    get ubicacionSelector(){return this.despachoForm.get('ubicacionSelector');}
    get descripcion(){return this.despachoForm.get('descripcion')}

  ngOnInit() {
      this.bodegaService.devuelveBodegasPorCiudadProducto(parseInt(localStorage.getItem('usuario_ciudad')),this.data.codigo).subscribe(datos=>this.agregarBodegasSelect(datos));
      if(this.despachoForm.value.bodegaSelector > 0){
        this.bodegaService.traerUbicacionesProductoBodega(this.despachoForm.value.bodegaSelector, this.data.codigo,).subscribe(datos=>this.agregarUbicacion(datos));
        this.ubicacionSelector.enable();
      }
  }
  traerUbicacion(ob){
    let bodega = ob.value;
    this.bodegaSeleccionada = bodega;
    if(bodega > 0){
      this.bodegaService.traerUbicacionesProductoBodega(this.despachoForm.value.bodegaSelector, this.data.codigo,).subscribe(datos=>this.agregarUbicacion(datos));
      this.ubicacionSelector.enable();
    }else{
      this.ubicacionSelector.disable();
    }
  }
  traerCantidad(ob){
    let ubicacion = ob.value;
    this.productoService.traerCantidad(this.bodegaSeleccionada, ubicacion, this.data.codigo).subscribe(datos=>this.mostrarCantidad(datos))
  }
  mostrarCantidad(datos){
    console.log(datos)
    try{
      if(datos.resultado[0].valor == null || datos.resultado[0].valor === 0 ){
        this.cantidad = 0
      }else{
        this.cantidad = parseInt(datos.resultado[0].valor) ;
      }
    }catch{
      this.cantidad = 0;
    }
  }


  agregarUbicacion(datos){
    console.log(datos);
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
    console.log(datos);
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
    if(this.despachoForm.valid){
      let movimiento:ModalSalida;
      let bodega = this.despachoForm.value.bodegaSelector;
      let ubicaicon = this.despachoForm.value.ubicacionSelector;
      let descripcion = this.despachoForm.value.descripcion;
      let cantidad = parseInt(this.despachoForm.value.cantidad);
      let producto = this.data.codigo;
      movimiento = new ModalSalida(0,producto,bodega,cantidad,descripcion,ubicaicon);
      if( cantidad > this.cantidad){
        this.openSnackBar("No tienes esa cantidad", "Cerrar")

      }else{
        this.despachoService.insertarDespacho(movimiento).subscribe(datos=>this.confirmacion(datos), eror=>console.log(eror));
      this.dialogRef.close();
      this.openSnackBar("Salida registrado exitosamente", "Cerrar")
      }
      
    }
    else{
      this.openSnackBar("El formulario no es válido", "Cerrar");
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmacion(datos){
    this.openSnackBar(datos.resultado[0].respuesta, 'Cerrar');
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
