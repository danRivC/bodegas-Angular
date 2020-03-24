import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { ModalEntradaComponent } from '../modal-entrada/modal-entrada.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BodegasService } from '../bodega/services/bodegas.service';
import { ModalEntradaService } from '../modal-entrada/service/modal-entrada.service';
import { ModalMovimiento } from './models/modal-movimiento.model';
import { ModalMovimientoService } from './service/modal-movimiento.service';
import { ProductoService } from '../producto/service/producto.service';

@Component({
  selector: 'app-modal-movimiento',
  templateUrl: './modal-movimiento.component.html',
  styleUrls: ['./modal-movimiento.component.scss']
})
export class ModalMovimientoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalEntradaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IProducto, 
    private bodegaService:BodegasService, private formBuilder:FormBuilder, 
    private movimientoService: ModalMovimientoService,
    private _snackBar: MatSnackBar, private productoService: ProductoService) {
      this.buildForm();
    }
    producto= this.data.nombre
    cantidad:number = 0;
    bodegaSeleccionada: number;
    ubicaciones: Array<any>;
    ubicacionesOrigen: Array<any>;
    bodegas: Array<any>;
    bodegasOrigen: Array<any>;
    movimientoForm: FormGroup;
    private buildForm(){
      this.movimientoForm= this.formBuilder.group({
        ubicacionSelector:['', Validators.required],
        bodegaSelector: ['', Validators.required],
        descripcion:['', Validators.required],
        cantidad:['',[Validators.required, Validators.pattern('[0-9]*')]],
        bodegaOrigenSelector:['', [Validators.required]],
        ubicacionOrigenSelector:['', Validators.required]
      })
    }
    get bodegaSelector(){return this.movimientoForm.get('bodegaSelector');}
    get ubicacionSelector(){return this.movimientoForm.get('ubicacionSelector');}
    get descripcion(){return this.movimientoForm.get('descripcion')}
    get bodegaOrigenSelector(){return this.movimientoForm.get('bodegaOrigenSelector')}
    get ubicacionOrigenSelector(){return this.movimientoForm.get('ubicacionOrigenSelector')}
    onNoClick(): void {
      this.dialogRef.close();
    }
    ngOnInit(){
      this.bodegaService.devuelveListaBodegas().subscribe(datos=>this.agregarBodegasSelect(datos));
      this.bodegaService.devuelveBodegasPorCiudadProducto(parseInt(localStorage.getItem('usuario_ciudad')),this.data.codigo).subscribe(datos=>this.agregarBodegasOrigen(datos));
      if(this.movimientoForm.value.bodegaSelector > 0){
        this.bodegaService.traerUbicacionesDisponibles(this.movimientoForm.value.bodegaSelector).subscribe(datos=>this.agregarUbicacion(datos));
        this.ubicacionSelector.enable();
      }
      if(this.movimientoForm.value.bodegaOrigenSelector > 0){
        this.bodegaService.traerUbicacionesProductoBodega(this.data.codigo,this.movimientoForm.value.bodegaOrigenSelector).subscribe(datos=>this.agregarUbicacionOrigen(datos), error=>console.log(error));
        this.ubicacionOrigenSelector.enable()
      }
      console.log(this.ubicacionesOrigen)
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
    traerUbicacionOrigen(ob){
      let bodega = ob.value
      this.bodegaSeleccionada = bodega
      if(bodega > 0){
        this.bodegaService.traerUbicacionesProductoBodega(bodega, this.data.codigo).subscribe(datos=>this.agregarUbicacionOrigen(datos));
        this.ubicacionOrigenSelector.enable();
      }else{
        this.ubicacionOrigenSelector.disable();
      }
    }
    traerCantidad(ob){
      let ubicacion = ob.value;
      this.productoService.traerCantidad(this.bodegaSeleccionada, ubicacion, this.data.codigo).subscribe(datos=>this.mostrarCantidad(datos))
    }
    mostrarCantidad(datos){
      if(datos.resultado[0].valor == null || datos.resultado[0].valor === 0 ){
        this.cantidad = 0
      }else{
        this.cantidad = parseInt(datos.resultado[0].valor) ;
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
    agregarUbicacionOrigen(datos){
      console.log('Ubicaciones'+datos.resultados)
      let dato: IdatoSelect;
      this.ubicacionesOrigen = [];
      datos.resultado.forEach(element => {
        dato = new IdatoSelect();
        if(element.estado === true){
          dato.codigo = element.codigo;
          dato.nombre = element.descripcion;
          this.ubicacionesOrigen.push(dato);
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
    agregarBodegasOrigen(datos){
      console.log(datos)
      let dato: IdatoSelect;
      this.bodegasOrigen = [];
      datos.resultado.forEach(element => {
        dato = new IdatoSelect();
        if(element.estado === true){
          dato.codigo = element.codigo;
          dato.nombre = element.nombre;
          this.bodegasOrigen.push(dato);
        }
      });
    }
    guardar(){
      if(this.movimientoForm.valid){
        
        let movimiento:ModalMovimiento;
        let bodega = this.movimientoForm.value.bodegaSelector;
        let ubicaicon = this.movimientoForm.value.ubicacionSelector;
        let descripcion = this.movimientoForm.value.descripcion;
        let cantidad = parseInt(this.movimientoForm.value.cantidad);
        let producto = this.data.codigo;
        let bodegaOrigen = this.movimientoForm.value.bodegaOrigenSelector;
        let ubicacionOrigen = this.movimientoForm.value.ubicacionOrigenSelector;
        movimiento = new ModalMovimiento(0,producto,bodega,ubicaicon,descripcion,bodegaOrigen,cantidad, ubicacionOrigen);
        if(cantidad > this.cantidad){
          this.openSnackBar("No tienes esa cantidad", "Cerrar")
        }else{
          this.movimientoService.insertarMovimiento(movimiento).subscribe(datos=>this.confirmacion(datos), eror=>console.log(eror));
        this.dialogRef.close();
        this.openSnackBar("Ingreso registrado exitosamente", "Cerrar");
        }
      }
      else{
        this.openSnackBar("El formulario no es válido", "Cerrar");
      }
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