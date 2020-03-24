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
    public class DespachoController : ControllerBase
    {
        private readonly ValoresDespacho _despacho;
        public DespachoController(ValoresDespacho despacho)
        {
            _despacho = despacho ?? throw new ArgumentNullException(nameof(despacho));
        }

        [HttpPost]
        public async Task<ActionResult<BaseResponse>>InsertaDespacho([FromBody] Despacho despacho )
        {
            try
            {
                return await _despacho.InsertaDespacho(despacho);
            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpGet("detalle/{id}/{fecha_inicio?}/{fecha_final?}")]
        public async Task<ActionResult<BaseResponse>> DevuelveListaDetalle(int id, string fecha_inicio, string fecha_final)
        {
            try
            {
                return await _despacho.DevuelveDetalleEntrada(id, fecha_inicio, fecha_final);
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}