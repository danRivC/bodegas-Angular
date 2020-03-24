import {Deserializable} from '../../../models/deserializable.model';

export class IUsuario implements Deserializable{
    public Codigo: number;
    public Nombre: string;
    public Apellido: string;
    public Username: string;
    public EstaActivo: string;
    public Correo: string;
    public Ciudad:number;
    deserialize(input:any):this{
        return Object.assign(this, input)
    }
}