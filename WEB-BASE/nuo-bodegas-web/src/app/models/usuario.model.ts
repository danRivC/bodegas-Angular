import {Deserializable} from './deserializable.model';

export class IUsuario implements Deserializable{
    public Codigo: number;
    public Nombre: string;
    public Apellido: string;
    public Username: string;
    public EstaActivo: string;
    public Correo: string;

    deserialize(input:any):this{
        return Object.assign(this, input)
    }
}