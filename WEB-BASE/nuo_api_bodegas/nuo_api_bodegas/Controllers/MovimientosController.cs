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
    public class MovimientosController : ControllerBase
    {
        private readonly ValoresMovimientos _movimiento;
        public MovimientosController(ValoresMovimientos movimiento)
        {
            _movimiento = movimiento ?? throw new ArgumentNullException(nameof(movimiento));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BaseResponse>> DevuelveMovimientoProducto(int id)
        {
            try
            {
                return await _movimiento.DevuelveMovimientoProducto(id);
            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpPost]
        public async Task<ActionResult<BaseResponse>> InsertaMovimiento([FromBody] Movimiento movimiento)
        {
            try
            {
                return await _movimiento.InsertaActualizaMovimiento(movimiento);
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}