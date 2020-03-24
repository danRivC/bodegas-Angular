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
    public class ModelosController : ControllerBase
    {
        private readonly ValoresModelos _modelos;

        public ModelosController(ValoresModelos modelos)
        {
            _modelos = modelos ?? throw new ArgumentNullException(nameof(modelos));

        }

        [HttpGet]
        public async Task<ActionResult<BaseResponse>> DevuelveListaModelos()
        {
            try
            {
                return await _modelos.ListaModelos();
            }
            catch (Exception)
            {

                return BadRequest();
            }
        }
        [HttpPost]
        public async Task<ActionResult<BaseResponse>> InsertaActualizaModelo([FromBody] Modelos modelo)
        {
            try
            {
                return await _modelos.InsertarActualizar(modelo);
            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpGet ("{id}")]
        public async Task<ActionResult<BaseResponse>> DevuelveModelo(int id)
        {
            try
            {
                return await _modelos.TraerModelo(id);
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}