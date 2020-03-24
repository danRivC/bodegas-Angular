using Microsoft.Extensions.Configuration;
using nuo_api_bodegas.Metodos;
using nuo_api_bodegas.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace nuo_api_bodegas.Data
{
    public class ValoresTipo
    {
        private readonly string _connectionString;
        private readonly IConfiguration _configuration;

        public ValoresTipo(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("defaultConnection");
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
        }
        public async Task<BaseResponse> DevuelveListaTipos()
        {
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                BaseResponse response = new BaseResponse();
                response.resultado = new List<object>();
                try
                {
                    using (SqlCommand cmd = new SqlCommand("SP_DEVUELVE_LISTA_TIPOS", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        response.status = "correcto";
                        response.mensaje = "Consulta Correcta";
                        Tipo _ciudad = new Tipo();
                        response.codigo = "201";
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                _ciudad = MapearTipo(reader);
                                response.resultado.Add(_ciudad);
                            }
                        }
                        return response;
                    }
                }
                catch (Exception)
                {
                    throw;
                }
            }
        }

        public async Task<BaseResponse> InsertaActualizaTipo(Tipo tipo)
        {
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                BaseResponse response = new BaseResponse();
                response.resultado = new List<object>();
                try
                {
                    using (SqlCommand cmd = new SqlCommand("SP_INSERTA_ACTUALIZA_TIPO", sql))
                    {
                        cmd.Parameters.Add(new SqlParameter("@CODIGO_TPR", tipo.codigo));
                        cmd.Parameters.Add(new SqlParameter("@NOMBRE_TPR", tipo.nombre));
                        cmd.Parameters.Add(new SqlParameter("@ESTADO_TPR", tipo.estado));
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        response.status = "correcto";
                        response.mensaje = "Ciudad Guardada Correctamente";
                        Respuesta _respuesta = new Respuesta();
                        response.codigo = "201";
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                _respuesta = Utilidades.MapearRespuesta(reader);
                                response.resultado.Add(_respuesta);
                            }
                        }
                        return response;
                    }
                }
                catch (Exception)
                {
                    response.status = "correcto";
                    response.mensaje = "No se pudo guardar la ciudad";
                    response.codigo = "410";
                    return response;
                }
            }
        }

        public async Task<BaseResponse> TraerTipo(int codigo)
        {
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                BaseResponse response = new BaseResponse();
                response.resultado = new List<object>();
                try
                {
                    using (SqlCommand cmd = new SqlCommand("SP_DEVUELVE_TIPO", sql))
                    {
                        cmd.Parameters.Add(new SqlParameter("@CODIGO_TPR", codigo));
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        response.status = "correcto";
                        response.mensaje = "Consulta Correcta";
                        Tipo _tipo = new Tipo();
                        response.codigo = "201";
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                _tipo = MapearTipo(reader);
                                response.resultado.Add(_tipo);
                            }
                        }
                        return response;
                    }
                }
                catch (Exception)
                {
                    throw;
                }
            }
        }

        public static Tipo MapearTipo(SqlDataReader reader)
        {
            Tipo tipo = new Tipo();
            try
            {
                tipo.codigo = Convert.ToInt32(reader["CODIGO_TPR"]);
                tipo.nombre = Convert.ToString(reader["NOMBRE_TPR"]);
                tipo.estado = Convert.ToBoolean(reader["ESTADO_TPR"]);
                return tipo;
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
