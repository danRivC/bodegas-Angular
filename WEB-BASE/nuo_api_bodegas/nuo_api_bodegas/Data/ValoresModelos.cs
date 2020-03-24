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
    public class ValoresModelos
    {
        private readonly string _connectionString;
        private readonly IConfiguration _configuration;

        public ValoresModelos(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("defaultConnection");
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
        }

        public async Task<BaseResponse> ListaModelos()
        {
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                BaseResponse response = new BaseResponse();
                response.resultado = new List<object>();
                try
                {
                    using (SqlCommand cmd = new SqlCommand("SP_DEVUELVE_LISTA_MODELOS", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        response.status = "correcto";
                        response.mensaje = "Consulta Correcta";
                        Modelos _modelos = new Modelos();
                        response.codigo = "201";
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                _modelos = MapearModelos(reader);
                                response.resultado.Add(_modelos);
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

        public async Task<BaseResponse> InsertarActualizar(Modelos modelos)
        {
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                BaseResponse response = new BaseResponse();
                response.resultado = new List<object>();
                try
                {
                    using (SqlCommand cmd = new SqlCommand("SP_INSERTA_ACTUALIZA_MODELO", sql))
                    {
                        cmd.Parameters.Add(new SqlParameter("@CODIGO_MODELO", modelos.codigo));
                        cmd.Parameters.Add(new SqlParameter("@NOMBRE_MODELO", modelos.nombre));
                        cmd.Parameters.Add(new SqlParameter("@ESTADO_MODELO", modelos.estado));
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        response.status = "correcto";
                        response.mensaje = "Proveedor Guardado Correctamente";
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
                    response.mensaje = "No se pudo guardar el modelo";
                    response.codigo = "410";
                    return response;
                }
            }
        }

        public async Task<BaseResponse> TraerModelo(int codigo)
        {
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                BaseResponse response = new BaseResponse();
                response.resultado = new List<object>();
                try
                {
                    using (SqlCommand cmd = new SqlCommand("SP_DEVUELVE_MODELO", sql))
                    {
                        cmd.Parameters.Add(new SqlParameter("@CODIGO_MODELO", codigo));
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        response.status = "correcto";
                        response.mensaje = "Consulta Correcta";
                        Modelos modelo = new Modelos();
                        response.codigo = "201";
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                modelo = MapearModelos(reader);
                                response.resultado.Add(modelo);
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

        public static Modelos MapearModelos(SqlDataReader reader)
        {
            Modelos modelo = new Modelos();
            modelo.codigo = Convert.ToInt32(reader["CODIGO_MODELO"]);
            modelo.nombre = Convert.ToString(reader["NOMBRE_MODELO"]);
            modelo.estado = Convert.ToBoolean(reader["ESTADO_MODELO"]);
            return modelo;

        }

    }
}
