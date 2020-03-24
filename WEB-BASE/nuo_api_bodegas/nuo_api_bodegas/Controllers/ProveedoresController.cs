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
    public class ProveedoresController : ControllerBase
    {
        private readonly ValoresProveedores _proveedores;

        public ProveedoresController(ValoresProveedores proveedores)
        {
            _proveedores = proveedores ?? throw new ArgumentNullException(nameof(proveedores));
        }

        [HttpGet]
        public async Task<ActionResult<BaseResponse>> ListaProveedores()
        {
            try
            {
                return await _proveedores.ListaProveedores();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPost]
        public async Task<ActionResult<BaseResponse>> InsertaActualizaProveedores([FromBody] Proveedor proveedor)
        {
            try
            {
                return await _proveedores.InsertaActualizaProveedores(proveedor);
            }
            catch (Exception)
            {

                return BadRequest();
            }
        }
        [HttpGet ("{id}")]
        public async Task<ActionResult<BaseResponse>> DevuelveProveedor(int id)
        {
            try
            {
                return await _proveedores.DevuelveProveedor(id);
            }
            catch (Exception)
            {

                return BadRequest();
            }
        }
    }
}