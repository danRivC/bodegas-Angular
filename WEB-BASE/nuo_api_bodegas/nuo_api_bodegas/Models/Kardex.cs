using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace nuo_api_bodegas.Models
{
    public class Kardex
    {
        public int codigo_bod { get; set; }
        public int codigo { get; set; }
        public string nombre { get; set; }
        public string parte { get; set; }
        public string bodega { get; set; }
        public int cantidad { get; set; }
        public int stock { get; set; }
        public DateTime fecha_inicio { get; set; }
        public DateTime fecha_final { get; set; }
    }
}
