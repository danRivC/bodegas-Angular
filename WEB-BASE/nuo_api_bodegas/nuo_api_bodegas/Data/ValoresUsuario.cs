using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using nuo_api_bodegas.Metodos;
using nuo_api_bodegas.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.DirectoryServices;
using System.Linq;
using System.Threading.Tasks;

namespace nuo_api_bodegas.Data
{
    public class ValoresUsuario
    {
        
        private readonly string _connectionString;

        public ValoresUsuario(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("defaultConnection");
        }
        public async Task<BaseResponse> GetAll()
        {

            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("SP_DEVUELVE_LISTA_USUARIOS", sql))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    var response = new BaseResponse();
                    response.resultado = new List<object>();
                    response.codigo = "200";
                    response.mensaje = "Consulta Correcta";
                    response.status = "correcto";

                    await sql.OpenAsync();
                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        while(await reader.ReadAsync())
                        {
                            response.resultado.Add(Utilidades.MapToUsuario(reader));
                        }
                    }
                    return response;
                }
            }
        }


        public async Task<ActionResult<BaseResponse>> GetByUsername(string username, bool ab_estaActivo)
        {
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                BaseResponse response = new BaseResponse();
                response.resultado = new List<object>();
                try
                {
                    using (SqlCommand cmd = new SqlCommand("SP_DEVUELVE_USUARIO", sql))
                    {
                        cmd.Parameters.Add(new SqlParameter("@ALIAS_USR", username));
                        cmd.Parameters.Add(new SqlParameter("@ESTADO_USR", ab_estaActivo == true ? 1 : 0));
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        response.status = "correcto";
                        response.mensaje = "Consulta Correcta";
                        Usuario _usuario = new Usuario();
                        response.codigo = "201";
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                _usuario = Utilidades.MapToUsuario(reader);
                                response.resultado.Add(_usuario);
                            }
                        }
                        return response;
                    }
                }
                catch (Exception er)
                {

                    response.status = "error";
                    response.mensaje = er.Message;
                    response.codigo = "500";
                    return response;
                }
                
                
            }

        }

        public async Task<List<Usuario>> GetLogin()
        {
            
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                using (SqlCommand cmd = new SqlCommand("SP_DEVUELVE_LISTA_USUARIOS", sql))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    var response = new List<Usuario>();
                    await sql.OpenAsync();
                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            response.Add(Utilidades.MapToUsuario(reader));
                        }
                    }
                    return response;
                }
            }
        }

        public async Task<BaseRequest>PostUsuario(Usuario usuario)
        {
            BaseRequest request = new BaseRequest();
            request.datos = new List<object>();
            try
            {

                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("SP_INSERTA_ACTUALIZA_USUARIO", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@CODIGO_USR", usuario.Codigo));
                        cmd.Parameters.Add(new SqlParameter("@NOMBRE_USR", usuario.Nombre));
                        cmd.Parameters.Add(new SqlParameter("@APELLIDO_USR", usuario.Apellido));
                        cmd.Parameters.Add(new SqlParameter("@CORREO_USR", usuario.Correo));
                        cmd.Parameters.Add(new SqlParameter("@ALIAS_USR", usuario.Username));
                        cmd.Parameters.Add(new SqlParameter("@ESTADO_USR", usuario.EstaActivo));
                        
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                request.datos.Add(Utilidades.MapearRespuesta(reader));
                            }
                        }
                        return request;
                    }
                }
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
