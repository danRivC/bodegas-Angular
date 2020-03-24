﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace nuo_api_bodegas.Models
{
    public class Movimiento
    {
        public int codigo { get; set; }
        public int producto { get; set; }
        public int bodega { get; set; }
        public int ubicacion { get; set; }
        public string detalle { get; set; }
        public int bodegaAnt { get; set; }
        public int cantidad { get; set; }
        public int ubicacionAnt { get; set; }
    }
}