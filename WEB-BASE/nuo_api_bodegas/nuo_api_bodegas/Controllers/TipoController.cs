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
    public class TipoController : ControllerBase
    {
        private readonly ValoresTipo _tipo;
        public TipoController(ValoresTipo tipo)
        {
            _tipo = tipo ?? throw new ArgumentNullException(nameof(tipo));
        }

        [HttpGet]
        public async Task<ActionResult<BaseResponse>> DevuelveListaTipos()
        {
            BaseResponse response = new BaseResponse();
            try
            {
                return await _tipo.DevuelveListaTipos();
            }
            catch (Exception)
            {
                throw;
            }
        }
        [HttpPost]
        public async Task<ActionResult<BaseResponse>> InsertaActualizaTipo([FromBody] Tipo tipo)
        {
            BaseResponse response = new BaseResponse();
            try
            {
                return await _tipo.InsertaActualizaTipo(tipo);
            }
            catch (Exception)
            {
                throw;
            }
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<BaseResponse>> TraerTipo(int id)
        {
            return await _tipo.TraerTipo(id);
        }
    }
}