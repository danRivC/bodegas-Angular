import { Ciudad } from '../../ciudad/models/ciudad.model';

export class IBodega {
    private codigo: number;
    private nombre: string;
    private ciudad: Ciudad;
    private estado: boolean;

    constructor(codigo:number, nombre:string, ciudad:Ciudad, estado:boolean){
        this.ciudad = ciudad;
        this.codigo = codigo;
        this.nombre = nombre;
        this.estado = estado;
    }
    setCiudad(ciudad:Ciudad){
        this.ciudad = new Ciudad();
        this.ciudad = ciudad;
    }
    setCodigo(codigo:number){
        this.codigo = codigo;

    }
    setNombre(nombre:string){
        this.nombre = nombre;
    }
    setEstado(estado:boolean){
        this.estado = estado;
    }
}
