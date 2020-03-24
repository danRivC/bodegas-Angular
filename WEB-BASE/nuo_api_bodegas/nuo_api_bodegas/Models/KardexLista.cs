using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace nuo_api_bodegas.Models
{
    public class KardexLista
    {
        public DateTime fecha { get; set; }
        public string descripcion { get; set; }
        public int entrada { get; set; }
        public int salida { get; set; }
        public int stock { get; set; }
    }
}
