using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace nuo_api_bodegas.Models
{
    public class Perfiles
    {
        public int Codigo { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public bool EstaActivo { get; set; }
    }
}
