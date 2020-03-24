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
    public class ProductosController : ControllerBase
    {
        private readonly ValoresProductos _productos;
        public ProductosController(ValoresProductos productos)
        {
            _productos = productos ?? throw new ArgumentNullException(nameof(productos));
        }

        [HttpGet]
        public async Task<ActionResult<BaseResponse>> DevuelveListaCiudades()
        {
            BaseResponse response = new BaseResponse();
            try
            {
                return await _productos.DevuelveListaProductos();
            }
            catch (Exception)
            {
                throw;
            }
        }
        [HttpPost]
        public async Task<ActionResult<BaseResponse>> InsertaActualizaCiudad([FromBody] Producto producto)
        {
            BaseResponse response = new BaseResponse();
            try
            {
                return await _productos.InsertaActualizaProducto(producto);
            }
            catch (Exception)
            {
                throw;
            }
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<BaseResponse>> TraerCiudad(int id)
        {
            return await _productos.DevuelveProducto(id);
        }
        [HttpGet("cantidad/{bodega}/{ubicacion}/{producto}")]
        public async Task<ActionResult<BaseResponse>> DevuelveCantidad(int bodega, int ubicacion, int producto)
        {
            try
            {
                return await _productos.DevuelveCantidad(bodega, ubicacion, producto);
            }
            catch (Exception)
            {

                throw;
            }
        }
        
    }
}