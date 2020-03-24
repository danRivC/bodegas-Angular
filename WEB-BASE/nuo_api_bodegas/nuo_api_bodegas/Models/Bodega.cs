using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace nuo_api_bodegas.Models
{
    public class Bodega
    {
        public int Codigo { get; set; }
        public string Nombre { get; set; }
        public Ciudad Ciudad { get; set; }
        public bool Estado { get; set; }
        
    }
}
