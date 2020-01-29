using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace nuo_api_bodegas.Models
{
    public class BaseResponse
    {
        public string codigo { get; set; }

        public string mensaje { get; set; }
        public string status { get; set; }
        public List<Object>resultado {get; set;}
    }
}
