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
    public class PerfilController : ControllerBase
    {
        private readonly ValoresPerfiles _perfiles;

        public PerfilController(ValoresPerfiles perfiles)
        {
            _perfiles = perfiles ?? throw new ArgumentNullException(nameof(perfiles));
        }

        /// <summary>
        /// Lista de Perfiles por usuario
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<BaseResponse> Get(int id)
        {
            BaseResponse response = new BaseResponse();
            try
            {
                return await _perfiles.GetPerfilesById(id);
            }
            catch (Exception er)
            {
                response.codigo = "500";
                response.mensaje = er.Message;
                response.status = "error";
                return response;
            }
        }


        /// <summary>
        /// Insterta Actualiza Perfiles 
        /// </summary>
        /// <param name="perfil"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<BaseResponse> Post([FromBody]Perfiles perfil)
        {
            BaseResponse response = new BaseResponse();
            try
            {
                return await _perfiles.PostPerfil(perfil);
            }
            catch (Exception er)
            {
                response.codigo = "500";
                response.status = "error";
                response.mensaje = er.Message;
                return response;
            }
        }


        [HttpPost("perfilusuario")]
        public async Task<BaseRequest> PostPerfilUsuario([FromBody] List<object> list)
        {
            Usuario usuario = new Usuario();
            Perfiles perfil = new Perfiles();
            list = new List<object>();
            
            BaseRequest request = new BaseRequest();
            try
            {
                return await _perfiles.PostPerfilUsuario(usuario.Codigo, perfil.Codigo, true);
            }
            catch (Exception er)
            {
                request.codigo = "500";
                request.mensaje = er.Message;
                request.status = "error";
                return request;
            }
        }

    }
}