export class ModalEntrada {
    codigo:number;
    producto:number;
    bodega:number;
    cantidad:number;
    detalle:string;
    ubicacion:number;
    constructor(codigo:number, producto:number,bodega:number,cantidad:number,detalle:string, ubicacion:number){
        this.codigo=codigo;
        this.producto = producto;
        this.bodega = bodega;
        this.cantidad = cantidad;
        this.detalle = detalle;
        this.ubicacion = ubicacion
    }
}
