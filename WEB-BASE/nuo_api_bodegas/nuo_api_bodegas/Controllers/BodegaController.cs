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
    public class BodegaController : ControllerBase
    {
        private readonly ValoresBodegas _bodegas;

        public BodegaController(ValoresBodegas bodegas)
        {
            _bodegas = bodegas ?? throw new ArgumentNullException(nameof(bodegas));
        }
        [HttpGet]
        public async Task<ActionResult<BaseResponse>> ListaBodegas()
        {
            try
            {
                return await _bodegas.ListaBodegas();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPost]
        public async Task<ActionResult<BaseResponse>> InsertarActualizarBodega([FromBody] Bodega bodega)
        {

            try
            {
                return await _bodegas.InsertarActualizarBodega(bodega);
            }
            catch (Exception er)
            {
                return BadRequest();

            }
        }
        [HttpGet ("{id}")]
        public async Task<ActionResult<BaseRequest>> DevuelvePerfil(int id)
        {
            try
            {
                return await _bodegas.DevuelveBodega(id);
            }
            catch (Exception)
            {

                return BadRequest();
            }
        }
        
        [HttpGet("producto/{id}")]
        public async Task<ActionResult<BaseResponse>> DevuelveBodegasPorProducto(int id)
        {
            try
            {
                return await _bodegas.ListaBodegasPorProducto(id);
            }
            catch (Exception)
            {

                return BadRequest();
            }
        }

        [HttpGet("ciudad/{id}")]
        public async Task<ActionResult<BaseResponse>>DevuelveBodegasPorCiudad(int id)
        {
            try
            {
                return await _bodegas.ListaBodegasPorCiudad(id);
            }
            catch (Exception)
            {

                throw;
            }
        }

        

        [HttpPost("ubicaciones")]
        public async Task<ActionResult<BaseResponse>> InsertaActualizaUbicacion([FromBody] UbicacionesBodega ubicaciones)
        {
            try
            {
                return await _bodegas.InsertaActualizaUbicacionBodega(ubicaciones);
            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpGet("movimiento/{ciudad}/{producto}")]
        public async Task<ActionResult<BaseResponse>> DevuelveBodegasPorCiudadProducto(int ciudad, int producto)
        {
            try
            {
                return await _bodegas.ListaBodegasPorCiudadProducto(ciudad, producto);
            }
            catch (Exception)
            {

                throw;
            }

        }
    }
}