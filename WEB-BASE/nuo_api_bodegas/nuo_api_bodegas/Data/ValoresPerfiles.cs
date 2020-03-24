using Microsoft.Extensions.Configuration;
using nuo_api_bodegas.Metodos;
using nuo_api_bodegas.Models;
using ServiceReference1;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace nuo_api_bodegas.Data
{
    public class ValoresPerfiles
    {
        
        
        
        private readonly string _connectionString;
        public ValoresPerfiles(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("defaultConnection");
        }

        public async Task<BaseResponse> ListarPerfiles()
        {
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                BaseResponse response = new BaseResponse();
                response.resultado = new List<object>();
                try
                {
                    using (SqlCommand cmd = new SqlCommand("SP_DEVUELVE_LISTA_PERFILES", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        response.status = "correcto";
                        response.mensaje = "Consulta Correcta";
                        Perfiles _perfiles = new Perfiles();
                        response.codigo = "201";
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                _perfiles = Utilidades.MapearPerfiles(reader);
                                response.resultado.Add(_perfiles);
                            }
                        }
                        return response;
                    }
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

        public async Task<BaseRequest> GetPaginasPerfiles(int id)
        {
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                BaseRequest response = new BaseRequest();
                response.datos = new List<object>();
                try
                {
                    using (SqlCommand cmd = new SqlCommand("SP_DEVUELVE_PAGINAS_PERFIL", sql))
                    {
                        cmd.Parameters.Add(new SqlParameter("@CODIGO_PUS", id));
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        response.status = "correcto";
                        response.mensaje = "Consulta Correcta";
                        PaginasDisponible _perfiles = new PaginasDisponible();
                        response.codigo = "201";
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                _perfiles = Utilidades.MapearPaginasDisponibles(reader);
                                response.datos.Add(_perfiles);
                            }
                        }
                        return response;
                    }
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

        public async Task<BaseResponse> GetPerfilesById(int id)
        {
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                BaseResponse response = new BaseResponse();
                response.resultado = new List<object>();
                try
                {
                    using (SqlCommand cmd = new SqlCommand("SP_DEVUELVE_PERFIL", sql))
                    {
                        cmd.Parameters.Add(new SqlParameter("@CODIGO_PUS", id));
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        response.status = "correcto";
                        response.mensaje = "Consulta Correcta";
                        Perfiles _perfiles = new Perfiles();
                        Pagina _paginas = new Pagina();
                        response.codigo = "201";
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            
                            while (await reader.ReadAsync())
                            {
                                _perfiles =  Utilidades.MapearPerfiles(reader);
                                response.resultado.Add(_perfiles);
                                
                                
                            }
                        }
                        return response;
                    }
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

        public async Task<BaseResponse> GuardarPaginaPerfil(PaginaPerfil pagina)
        {
            BaseResponse response = new BaseResponse();
            response.resultado = new List<object>();
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("SP_INSERTA_ACTUALIZA_PAGINA", sql))
                    {
                        cmd.Parameters.Add(new SqlParameter("@CODIGO_PUS", pagina.codigoPerfil));
                        cmd.Parameters.Add(new SqlParameter("@ESTAACTIVO_MPE", pagina.estadoMpe));
                        cmd.Parameters.Add(new SqlParameter("@CODIGO_PAG", pagina.codigoPagina));
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        Respuesta respuesta = new Respuesta();
                        response.status = "correcto";
                        response.mensaje = "Consulta Correcta";
                        Perfiles _perfiles = new Perfiles();
                        response.codigo = "201";
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                response.resultado.Add(Utilidades.MapearRespuesta(reader));
                            }
                        }
                        return response;
                    }
                }
            }
            catch (Exception er)
            {
                response.codigo = "500";
                response.mensaje = er.Message;
                response.status = "error";
                return response;
            }

        }

        public async Task<BaseResponse>PostPerfil(Perfiles perfiles)
        {
            BaseResponse response = new BaseResponse();
            response.resultado = new List<object>();
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("SP_INSERTA_ACTUALIZA_PERFIL", sql))
                    {
                        cmd.Parameters.Add(new SqlParameter("@NOMBRE_PUS", perfiles.Nombre));
                        cmd.Parameters.Add(new SqlParameter("@DESCRIPCION_PUS", perfiles.Descripcion));
                        cmd.Parameters.Add(new SqlParameter("@CODIGO_PUS", perfiles.Codigo));
                        cmd.Parameters.Add(new SqlParameter("@ESTAACTIVO_PUS", perfiles.EstaActivo));
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        Respuesta respuesta = new Respuesta();
                        response.status = "correcto";
                        response.mensaje = "Consulta Correcta";
                        Perfiles _perfiles = new Perfiles();
                        response.codigo = "201";
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                response.resultado.Add(Utilidades.MapearRespuesta(reader));
                            }
                        }
                        return response;
                    }
                }
                
            }
            catch (Exception er)
            {
                response.codigo = "500";
                response.mensaje = er.Message;
                response.status = "error";

                return response;
            }
        }

        public async Task<BaseRequest>PostPerfilUsuario(int ai_codigoUsuario, int ai_codigoPerfil, bool ab_estaActivo)
        {
            BaseRequest request = new BaseRequest();
            request.datos = new List<object>();
            try
            {
                using (SqlConnection sql = new SqlConnection(_connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand("SP_INSERTA_ACTUALIZA_PERFIL_USUARIO", sql))
                    {
                        cmd.Parameters.Add(new SqlParameter("@CODIGO_USR", ai_codigoUsuario));
                        cmd.Parameters.Add(new SqlParameter("@CODIGO_PUS", ai_codigoPerfil));
                        cmd.Parameters.Add(new SqlParameter("@ESTAACTIVO_PUR", ab_estaActivo));
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        Respuesta respuesta = new Respuesta();
                        request.status = "correcto";
                        request.mensaje = "Consulta Correcta";
                        request.codigo = "201";
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
