using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using nuo_api_bodegas.Data;
using nuo_api_bodegas.Models;

namespace nuo_api_bodegas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UbicacionController : ControllerBase
    {
        private readonly ValoresUbicacion _ubicacion;
        public UbicacionController(ValoresUbicacion ubicacion)
        {
            _ubicacion = ubicacion ?? throw new ArgumentNullException(nameof(ubicacion));
        }

        [HttpGet]
        public async Task<ActionResult<BaseResponse>> DevueleListaUbicacion()
        {
            try
            {
                return await _ubicacion.DevuelveListaUbicaciones();
            }
            catch (Exception)
            {

                return BadRequest();
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BaseResponse>> DevuelveUbicacion(int id)
        {
            try
            {
                return await _ubicacion.DevuelveUbicacion(id);
            }
            catch (Exception)
            {

                return BadRequest();
            }
        }
        [HttpPost]
        public async Task<ActionResult<BaseResponse>> InsertaActualizaUbicacion([FromBody] Ubicacion ubicacion)
        {
            try
            {
                return await _ubicacion.InsertaActualizaUbicacion(ubicacion);
            }
            catch (Exception)
            {

                throw;
            }
        }
        [HttpGet ("bodegas/{id}")]
        public async Task<ActionResult<BaseResponse>> DevuelveUbicacionesBodega(int id)
        {
            try
            {
                return await _ubicacion.DevuelveUbicacionesBodega(id);
            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpGet("movimiento/{bodega}/{producto}")]
        public async Task<ActionResult<BaseResponse>> DevuelveUbicacionesPorBodegaProducto(int bodega, int producto)
        {
            try
            {
                return await _ubicacion.DevuelveUbicacionesBodegaProducto(bodega, producto);
            }
            catch (Exception)
            {

                throw;
            }
        }

    }
}