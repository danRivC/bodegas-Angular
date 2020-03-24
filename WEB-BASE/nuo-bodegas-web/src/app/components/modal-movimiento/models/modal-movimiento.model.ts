export class ModalMovimiento {
    codigo: number;
    producto: number;
    bodega: number;
    ubicacion: number;
    detalle: string;
    bodegaAnt: number;
    cantidad:number;
    ubicacionAnt: number;
    constructor(codigo:number, producto:number, bodega:number, ubicacion:number, detalle:string, bodegaAnt:number, cantidad:number, ubicacionAnt:number){
        this.codigo=codigo;
        this.producto=producto;
        this.bodega = bodega;
        this.ubicacion = ubicacion;
        this.detalle = detalle;
        this.bodegaAnt=bodegaAnt;
        this.cantidad = cantidad;
        this.ubicacionAnt = ubicacionAnt;
    }
}
