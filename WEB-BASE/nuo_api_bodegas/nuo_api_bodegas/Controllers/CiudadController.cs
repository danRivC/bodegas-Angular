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
    public class CiudadController : ControllerBase
    {

        private readonly ValoresCiudad _ciudad;
        public CiudadController(ValoresCiudad ciudad)
        {
            _ciudad = ciudad ?? throw new ArgumentNullException(nameof(ciudad));
        }

        [HttpGet]
        public async Task<ActionResult<BaseResponse>> DevuelveListaCiudades()
        {
            BaseResponse response = new BaseResponse();
            try
            {
                return await _ciudad.DevuelveListaCiudades();
            }
            catch (Exception)
            {
                throw;
            }
        }
        [HttpPost]
        public async Task<ActionResult<BaseResponse>> InsertaActualizaCiudad([FromBody] Ciudad ciudad)
        {
            BaseResponse response = new BaseResponse();
            try
            {
                return await _ciudad.InsertaActualizaCiudad(ciudad);
            }
            catch (Exception)
            {

                throw;
            }
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<BaseResponse>>TraerCiudad(int id)
        {
            return await _ciudad.TraerCiudad(id);
        }
    }
}