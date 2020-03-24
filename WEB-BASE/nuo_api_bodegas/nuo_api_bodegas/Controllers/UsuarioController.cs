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
    public class UsuarioController : ControllerBase
    {
        private readonly ValoresUsuario _usuarios;

        public UsuarioController(ValoresUsuario usuarios)
        {
            _usuarios = usuarios ?? throw new ArgumentNullException(nameof(usuarios));
        }

        [HttpGet]
        public async Task<BaseResponse> GetUsuarios()
        {
            BaseResponse response = new BaseResponse();
            try
            {
                return await _usuarios.GetAll();
            }
            catch (Exception er)
            {
                response.codigo = "500";
                response.mensaje = er.Message;
                response.status = "error";
                return response;
            }
        }

        [HttpPost]
        public async Task<BaseRequest> PostUsuario([FromBody] Usuario usuario)
        {
            BaseRequest request = new BaseRequest();
            try
            {
                return await _usuarios.PostUsuario(usuario);
            }
            catch (Exception er)
            {
                request.codigo = "500";
                request.mensaje = er.Message;
                request.status = "error";
                return request;
            }
        }

        [HttpGet("{ab_estaActivo}/{as_aliasUser?}")]
        public async Task<ActionResult<BaseResponse>> GetUsuario(string as_aliasUser, bool ab_estaActivo)
        {
            BaseResponse request = new BaseResponse();
            try
            {
                if (as_aliasUser != null)
                {
                    return await _usuarios.GetByUsername(as_aliasUser, ab_estaActivo);
                }
                else
                {
                    return await _usuarios.GetAll();
                }
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
        [HttpGet("perfiles/{id_usuario}")]
        public async Task<ActionResult<BaseResponse>> TraerPerfiles(int id_usuario)
        {
            BaseResponse response = new BaseResponse();
            try
            {
                return await _usuarios.TraerPerfiles(id_usuario);
            }
            catch (Exception)
            {

                throw;
            }
        }


        [HttpGet("buscar/{id_usuario}")]
        public async Task<ActionResult<BaseResponse>> BuscarUsuario(int id_usuario)
        {
            BaseResponse response = new BaseResponse();
            try
            {
                return await _usuarios.GetUsuario(id_usuario);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPost("perfiles")]
        public async Task<ActionResult<BaseRequest>> InsertarActualizarPerfiles([FromBody]PerfilUsuario perfil)
        {
            BaseRequest request = new BaseRequest();
            try
            {
                return await _usuarios.InsertarActualizarPerfiles(perfil);
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}