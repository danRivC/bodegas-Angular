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
    public class ValoresUbicacion
    {

        private readonly string _connectionString;
        private readonly IConfiguration _configuration;
        public ValoresUbicacion(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("defaultConnection");
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
        }





        public async Task<BaseResponse> DevuelveListaUbicaciones()
        {
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                BaseResponse response = new BaseResponse();
                response.resultado = new List<object>();
                try
                {
                    using (SqlCommand cmd = new SqlCommand("SP_DEVUELVE_LISTA_UBICACIONES", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        response.status = "correcto";
                        response.mensaje = "Consulta Correcta";
                        Ubicacion ubicacion = new Ubicacion();
                        response.codigo = "201";
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                ubicacion = MapearUbicacion(reader);
                                response.resultado.Add(ubicacion);
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

        public async Task<BaseResponse> InsertaActualizaUbicacion(Ubicacion ubicacion)
        {
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                BaseResponse response = new BaseResponse();
                response.resultado = new List<object>();
                try
                {
                    using (SqlCommand cmd = new SqlCommand("SP_INSERTA_ACTUALIZA_UBICACION", sql))
                    {
                        cmd.Parameters.Add(new SqlParameter("@CODIGO_UBI", ubicacion.codigo));
                        cmd.Parameters.Add(new SqlParameter("@DESCRIPCION_UBI", ubicacion.descripcion));
                        cmd.Parameters.Add(new SqlParameter("@ESTADO_UBI", ubicacion.estado));
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

        public async Task<BaseResponse> DevuelveUbicacionesBodega(int id)
        {
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                BaseResponse request = new BaseResponse();
                request.resultado = new List<object>();
                try
                {
                    using (SqlCommand cmd = new SqlCommand("SP_DEVUELVE_UBICACIONES_BODEGA", sql))
                    {
                        cmd.Parameters.Add(new SqlParameter("@CODIGO_BOD", id));
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        request.status = "correcto";
                        request.mensaje = "Consulta Correcta";
                        Ubicacion ubicacion = new Ubicacion();
                        request.codigo = "201";
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                ubicacion = MapearUbicacionBodega(reader) ;
                                request.resultado.Add(ubicacion);
                            }
                        }
                        return request;
                    }
                }
                catch (Exception)
                {
                    throw;
                }
            }
        }

        public async Task<BaseResponse> DevuelveUbicacionesBodegaProducto(int bodega, int producto)
        {
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                BaseResponse request = new BaseResponse();
                request.resultado = new List<object>();
                try
                {
                    using (SqlCommand cmd = new SqlCommand("SP_DEVUELVE_UBICACIONES_PRODUCTO_BODEGA", sql))
                    {
                        cmd.Parameters.Add(new SqlParameter("@CODIGO_BOD", bodega));
                        cmd.Parameters.Add(new SqlParameter("@CODIGO_PRO", producto));
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        request.status = "correcto";
                        request.mensaje = "Consulta Correcta";
                        Ubicacion ubicacion = new Ubicacion();
                        request.codigo = "201";
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                ubicacion = MapearUbicacionBodega(reader);
                                request.resultado.Add(ubicacion);
                            }
                        }
                        return request;
                    }
                }
                catch (Exception)
                {
                    throw;
                }
            }
        }







        public async Task<BaseResponse> DevuelveUbicacion(int codigo)
        {
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                BaseResponse response = new BaseResponse();
                response.resultado = new List<object>();
                try
                {
                    using (SqlCommand cmd = new SqlCommand("SP_DEVUELVE_UBICACION", sql))
                    {
                        cmd.Parameters.Add(new SqlParameter("@CODIGO_UBI", codigo));
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        response.status = "correcto";
                        response.mensaje = "Consulta Correcta";
                        Ubicacion ubicacion = new Ubicacion();
                        response.codigo = "201";
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                ubicacion = MapearUbicacion(reader);
                                response.resultado.Add(ubicacion);
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

        public static Ubicacion MapearUbicacion(SqlDataReader reader)
        {
            Ubicacion ubicacion = new Ubicacion();
            try
            {
                ubicacion.codigo = Convert.ToInt32(reader["CODIGO_UBI"]);
                ubicacion.descripcion = Convert.ToString(reader["DESCRIPCION_UBI"]);
                ubicacion.estado = Convert.ToBoolean(reader["ESTADO_UBI"]);
                return ubicacion;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public static Ubicacion MapearUbicacionBodega(SqlDataReader reader)
        {
            Ubicacion ubicacion = new Ubicacion();
            try
            {
                ubicacion.codigo = Convert.ToInt32(reader["CODIGO_UBI"]);
                ubicacion.descripcion = Convert.ToString(reader["DESCRIPCION_UBI"]);
                ubicacion.estado = Convert.ToBoolean(reader["ESTADO_BUI"]);
                return ubicacion;
            }
            catch (Exception)
            {
                throw;
            }
        }

    }
}
