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
    public class PaginasController : ControllerBase
    {
        private readonly ValoresPaginas _paginas;

        public PaginasController(ValoresPaginas paginas)
        {
            _paginas = paginas ?? throw new ArgumentNullException(nameof(paginas));
        }


        [HttpGet("{id}/{estado}")]
        public async Task<BaseResponse> Get(int id, string estado)
        {
            BaseResponse response = new BaseResponse();
            try
            {
                return await _paginas.GetByAdminId(id, estado);
            }
            catch (Exception er)
            {
                response.codigo = "500";
                response.mensaje = er.Message;
                response.status = "error";
                return response;
            }
        }

        

       
    }
}