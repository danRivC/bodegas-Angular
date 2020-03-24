export class Proveedor {
    public codigo:number;
    public nombre:string;
    public ruc:string;
    public estado:boolean;
    constructor(codigo:number, nombre:string, ruc:string, estado:boolean){
        this.codigo = codigo;
        this.nombre = nombre;
        this.ruc = ruc;
        this.estado = estado;
    }
}

