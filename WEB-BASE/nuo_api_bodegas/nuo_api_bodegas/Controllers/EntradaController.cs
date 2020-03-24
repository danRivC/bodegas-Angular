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
    public class EntradaController : ControllerBase
    {
        private readonly ValoresEntrada _entrada;
        public EntradaController(ValoresEntrada entrada)
        {
            _entrada = entrada ?? throw new ArgumentNullException(nameof(entrada));
        }

        [HttpPost]
        public async Task<ActionResult<BaseResponse>> IngresaEntrada([FromBody] Entrada entrada)
        {
            try
            {
                return await _entrada.InsertaEntrada(entrada);
            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpGet("detalle/{id}/{fecha_inicio?}/{fecha_final?}")]
        public async Task<ActionResult<BaseResponse>> DevuelveDetalleEntradas(int id, string fecha_inicio, string fecha_final)
        {
            try
            {
                return await _entrada.DevuelveDetalleEntrada(id, fecha_inicio, fecha_final);
            }
            catch (Exception)
            {

                throw;
            }
        }

    }
}