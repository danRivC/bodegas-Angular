using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace nuo_api_bodegas.Models
{
    public class Producto
    { 
        public int codigo_pr { get; set; }
        public string nombre_pr { get; set; }
        public string numero_parte_pr { get; set; }
        public string numero_serie_pr { get; set; }
        public bool estado_pr { get; set; }
        
        public Modelos modelo { get; set; }
        public Proveedor proveedor { get; set; }
        public Tipo tipo { get; set; }
        
        
    }
}
