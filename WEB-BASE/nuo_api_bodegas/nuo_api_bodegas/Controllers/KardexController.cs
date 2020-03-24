using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using nuo_api_bodegas.Data;
using nuo_api_bodegas.Models;

namespace nuo_api_bodegas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class KardexController : ControllerBase
    {
        private readonly ValoresKardex _kardex;
        public KardexController(ValoresKardex kardex)
        {
            _kardex = kardex ?? throw new ArgumentNullException(nameof(kardex));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BaseResponse>> ListaProductosKardex(int id)
        {
            try
            {
                return await _kardex.ListaProductosKardex(id);
            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpGet("detalle/{bodega}/{codigo}/{fecha_inicio?}/{fecha_final?}")]
        public async Task<ActionResult<BaseResponse>> DeuvleveMovimientoKardex (int bodega, int codigo, string fecha_inicio, string fecha_final)
        {
            try
            {
                return await _kardex.MovimientoKardex(bodega, codigo, fecha_inicio, fecha_final);
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}