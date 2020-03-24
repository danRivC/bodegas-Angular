using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace nuo_api_bodegas.Models
{
    public class Proveedor
    {
        public int codigo { get; set; }
        public string nombre { get; set; }
        public bool estado { get; set; }
        public string ruc { get; set; }
    }
}
