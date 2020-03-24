import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProveedorService } from '../service/proveedor.service';
import { MatSnackBar } from '@angular/material';
import {Location} from '@angular/common';
import { Proveedor } from '../models/proveedor.model';

@Component({
  selector: 'app-proovedor-formulario',
  templateUrl: './proovedor-formulario.component.html',
  styleUrls: ['./proovedor-formulario.component.scss']
})
export class ProovedorFormularioComponent implements OnInit {

  titulo = 'Administrar Proveedor';
  activo:boolean;
  inactivo:boolean;
  proveedorForm: FormGroup;
  constructor(private router:Router, private _formBuilder:FormBuilder, private _location: Location, private _proveedorService: ProveedorService, private _snackBar: MatSnackBar)
  {
    this.buildForm();
  }
  private buildForm(){
    this.proveedorForm = this._formBuilder.group({
      nombre:['', Validators.required],
      ruc:['', [Validators.required, Validators.minLength(13), Validators.maxLength(13),Validators.pattern('[0-9]{13}')]],
      estado:['', Validators.required]
    })
  }
  get nombre(){return this.proveedorForm.get('nombre');}
  get estado(){return this.proveedorForm.get('estado');}
  get ruc(){return this.proveedorForm.get('ruc');}
  regresar(){
    this._location.back();
    sessionStorage.clear();
  }
  ngOnInit() {
    if(sessionStorage.getItem('codigoProveedor')){
      this._proveedorService.devuelveProveedor(parseInt(sessionStorage.getItem('codigoProveedor'))).subscribe(proveedor=>this.rellenarProveedor(proveedor))
    }

  }
  rellenarProveedor(proveedor){
    let nombre = proveedor.resultado[0].nombre;
    let estado = proveedor.resultado[0].estado;
    let ruc = proveedor.resultado[0].ruc
    this.proveedorForm.setValue({
      nombre:nombre,
      estado:estado,
      ruc: ruc
    })
    if(estado===true){
      this.activo=true;
      this.inactivo = false;
    }else{
      this.activo=false;
      this.inactivo=true;
    }
  }
  guardarProveedor(){
    if(this.proveedorForm.valid){
      let proovedor : Proveedor;
      if(sessionStorage.getItem('codigoProveedor')){
        proovedor = new Proveedor(parseInt(sessionStorage.getItem('codigoProveedor')), this.proveedorForm.value.nombre, this.proveedorForm.value.ruc, this.proveedorForm.value.estado);
        
      }else{
        proovedor = new Proveedor(0, this.proveedorForm.value.nombre, this.proveedorForm.value.ruc, this.proveedorForm.value.estado);
        
      }
      this._proveedorService.insertaActualizaProveedor(proovedor).subscribe(datos=>this.confirmacion(datos), error=>console.log(error))
    }else{
      this.openSnackBar('Todos los datos son requeridos.','Cerrar');
    }

  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
  confirmacion(respuesta){
    if(parseInt(respuesta.codigo) < 400){
      this.openSnackBar(respuesta.mensaje, 'Cerrar')
    this.router.navigate(['proveedores']);
    }else{
      this.openSnackBar(respuesta.mensaje, 'Cerrar')
    }

  }

}
