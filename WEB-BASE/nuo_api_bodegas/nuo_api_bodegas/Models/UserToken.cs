using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace nuo_api_bodegas.Models
{
    public class UserToken
    {
        public string token { get; set; }
        public DateTime expiracion { get; set; }
    }
}
