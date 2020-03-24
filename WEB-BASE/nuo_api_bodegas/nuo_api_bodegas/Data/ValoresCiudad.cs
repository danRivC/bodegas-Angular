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
    public class ValoresCiudad
    {
        private readonly string _connectionString;
        private readonly IConfiguration _configuration;

        public ValoresCiudad(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("defaultConnection");
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
        }
        public async Task<BaseResponse> DevuelveListaCiudades()
        {
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                BaseResponse response = new BaseResponse();
                response.resultado = new List<object>();
                try
                {
                    using (SqlCommand cmd = new SqlCommand("SP_DEVUELVE_LISTA_CIUDADES", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        response.status = "correcto";
                        response.mensaje = "Consulta Correcta";
                        Ciudad _ciudad = new Ciudad();
                        response.codigo = "201";
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                _ciudad = MapearCiudad(reader);
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

        public async Task<BaseResponse> InsertaActualizaCiudad(Ciudad ciudad)
        {
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                BaseResponse response = new BaseResponse();
                response.resultado = new List<object>();
                try
                {
                    using (SqlCommand cmd = new SqlCommand("SP_INSERTA_ACTUALIZA_CIUDAD", sql))
                    {
                        cmd.Parameters.Add(new SqlParameter("@CODIGO_CIU", ciudad.codigo));
                        cmd.Parameters.Add(new SqlParameter("@NOMBRE_CIU", ciudad.nombre));
                        cmd.Parameters.Add(new SqlParameter("@ESTAACTIVO_CIU", ciudad.estado));
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

        public async Task<BaseResponse> TraerCiudad(int codigo)
        {
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                BaseResponse response = new BaseResponse();
                response.resultado = new List<object>();
                try
                {
                    using (SqlCommand cmd = new SqlCommand("SP_DEVUELVE_CIUDAD", sql))
                    {
                        cmd.Parameters.Add(new SqlParameter("@CODIGO_CIU", codigo));
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        response.status = "correcto";
                        response.mensaje = "Consulta Correcta";
                        Ciudad _ciudad = new Ciudad();
                        response.codigo = "201";
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                _ciudad = MapearCiudad(reader);
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

        public static Ciudad MapearCiudad(SqlDataReader reader)
        {
            Ciudad ciudad = new Ciudad();
            try
            {
                ciudad.codigo = Convert.ToInt32(reader["CODIGO_CIU"]);
                ciudad.nombre = Convert.ToString(reader["NOMBRE_CIU"]);
                ciudad.estado = Convert.ToBoolean(reader["ESTAACTIVO_CIU"]);
                return ciudad;
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
