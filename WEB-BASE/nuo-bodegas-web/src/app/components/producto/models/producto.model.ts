import { Modelos } from '../../modelos/models/modelos.model';
import { Proveedor } from '../../proveedor/models/proveedor.model';
import { TipoProducto } from '../../tipo-producto/models/tipo-producto.model';
import { IBodega } from '../../bodega/models/bodega.model';
import { Ubicacion } from '../../ubicacion/models/ubicacion.model';

export class Producto {
    codigo_pr:number;
    nombre_pr:string;
    numero_parte_pr:string;
    numero_serie_pr:string
    estado_pr: boolean;
    modelo:Modelos;
    proveedor: Proveedor;
    tipo: TipoProducto;
}
