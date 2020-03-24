using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace nuo_api_bodegas.Models
{
    public class DespachoDetalle
    {
        public DateTime fecha { get; set; }
        public string nombre { get; set; }
        public string serie { get; set; }
        public string parte { get; set; }
        public int cantidad { get; set; }
        public string proveedor { get; set; }
        public string modelo { get; set; }
        public string bodega { get; set; }
        public string detalle { get; set; }
    }
}
