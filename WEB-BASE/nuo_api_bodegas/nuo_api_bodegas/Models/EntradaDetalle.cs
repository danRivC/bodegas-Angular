using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace nuo_api_bodegas.Models
{
    public class EntradaDetalle
    {
        public DateTime fecha { get; set; }
        public string nombre { get; set; }
        public string serie { get; set; }
        public string parte { get; set; }
        public int cantidad { get; set; }
        public string proveedor {get;set;}
        public string modelo { get; set; }
        public string ubicacion { get; set; }
        public string detalle { get; set; }

    }
}
