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
    public class ValoresBodegas
    {
        private readonly string _connectionString;
        private readonly IConfiguration _configuration;

        public ValoresBodegas(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("defaultConnection");
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
        }

        public async Task<BaseResponse> ListaBodegas()
        {
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                BaseResponse response = new BaseResponse();
                response.resultado = new List<object>();
                try
                {
                    using (SqlCommand cmd = new SqlCommand("SP_DEVUELVE_LISTA_BODEGAS", sql))
                    {   
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        response.status = "correcto";
                        response.mensaje = "Consulta Correcta";
                        Bodega _bodega = new Bodega();
                        response.codigo = "201";
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                _bodega = MapearBodegas(reader);
                                response.resultado.Add(_bodega);
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


        public async Task<BaseResponse> ListaBodegasPorProducto(int id)
        {
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                BaseResponse response = new BaseResponse();
                response.resultado = new List<object>();
                try
                {
                    using (SqlCommand cmd = new SqlCommand("SP_DEVELVE_BODEGAS_PRODUCTO", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@CODIGO_PRO", id));
                        response.status = "correcto";
                        response.mensaje = "Consulta Correcta";
                        Bodega _bodega = new Bodega();
                        response.codigo = "201";
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                _bodega = MapearBodegas(reader);
                                response.resultado.Add(_bodega);
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



        public async Task<BaseResponse> ListaBodegasPorCiudad(int id)
        {
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                BaseResponse response = new BaseResponse();
                response.resultado = new List<object>();
                try
                {
                    using (SqlCommand cmd = new SqlCommand("SP_DEVELVE_BODEGAS_CIUDAD", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@CODIGO_CIU", id));
                        response.status = "correcto";
                        response.mensaje = "Consulta Correcta";
                        Bodega _bodega = new Bodega();
                        response.codigo = "201";
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                _bodega = MapearBodegas(reader);
                                response.resultado.Add(_bodega);
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


        public async Task<BaseResponse> ListaBodegasPorCiudadProducto(int ciudad, int producto)
        {
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                BaseResponse response = new BaseResponse();
                response.resultado = new List<object>();
                try
                {
                    using (SqlCommand cmd = new SqlCommand("SP_DEVUELVE_BODEGA_CIUDAD_PRODUCTO", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@CODIGO_CIU", ciudad));
                        cmd.Parameters.Add(new SqlParameter("@CODIGO_PRO", producto));
                        response.status = "correcto";
                        response.mensaje = "Consulta Correcta";
                        Bodega _bodega = new Bodega();
                        response.codigo = "201";
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                _bodega = MapearBodegas(reader);
                                response.resultado.Add(_bodega);
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




        public async Task<BaseResponse> InsertaActualizaUbicacionBodega(UbicacionesBodega ubicacion)
        {
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                BaseResponse request = new BaseResponse();
                request.resultado = new List<object>();
                try
                {
                    using (SqlCommand cmd = new SqlCommand("SP_INSERTA_ACTUALIZA_UBICACION_BODEGA", sql))
                    {
                        cmd.Parameters.Add(new SqlParameter("@CODIGO_BOD", ubicacion.codigoBod));
                        cmd.Parameters.Add(new SqlParameter("@ESTADO_BUI", ubicacion.estado));
                        cmd.Parameters.Add(new SqlParameter("@CODIGO_UBI", ubicacion.codigoBui));

                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        request.status = "correcto";
                        request.mensaje = "Consulta Correcta";
                        Respuesta respuesta = new Respuesta();
                        request.codigo = "201";
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                respuesta = Utilidades.MapearRespuesta(reader);
                                request.resultado.Add(respuesta);
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



        public async Task<BaseRequest> DevuelveBodega(int id)
        {
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                BaseRequest request = new BaseRequest();
                request.datos = new List<object>();
                try
                {
                    using (SqlCommand cmd = new SqlCommand("SP_DEVUELVE_BODEGA", sql))
                    {
                        cmd.Parameters.Add(new SqlParameter("@CODIGO_BOD", id));
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        request.status = "correcto";
                        request.mensaje = "Consulta Correcta";
                        Bodega bodega = new Bodega();
                        request.codigo = "201";
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                bodega = MapearBodegas(reader);
                                request.datos.Add(bodega);
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


        public async Task<BaseResponse> InsertarActualizarBodega(Bodega bodega)
        {
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                BaseResponse response = new BaseResponse();
                response.resultado = new List<object>();
                try
                {
                    using (SqlCommand cmd = new SqlCommand("SP_INSERTA_ACTUALIZAR_BODEGA", sql))
                    {
                        cmd.Parameters.Add(new SqlParameter("@CODIGO_BOD", bodega.Codigo));
                        cmd.Parameters.Add(new SqlParameter("@NOMBRE_BOD", bodega.Nombre));
                        cmd.Parameters.Add(new SqlParameter("@ESTADO_BOD", bodega.Estado));
                        cmd.Parameters.Add(new SqlParameter("@CODIGO_CIU", bodega.Ciudad.codigo));
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        response.status = "correcto";
                        response.mensaje = "Consulta Correcta";
                        Respuesta respuesta = new Respuesta();
                        response.codigo = "201";
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                respuesta = Utilidades.MapearRespuesta(reader);
                                response.resultado.Add(respuesta);
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



        public static Bodega MapearBodegas(SqlDataReader reader)
        {
            try
            {
                Bodega bodega = new Bodega();
                bodega.Ciudad = new Ciudad();
                bodega.Codigo = Convert.ToInt32(reader["CODIGO_BOD"]);
                bodega.Nombre = Convert.ToString(reader["NOMBRE_BOD"]);
                bodega.Ciudad.nombre = Convert.ToString(reader["NOMBRE_CIU"]);
                bodega.Ciudad.codigo = Convert.ToInt32(reader["CODIGO_CIU"]);
                bodega.Ciudad.estado = Convert.ToBoolean(reader["ESTAACTIVO_CIU"]);
                bodega.Estado = Convert.ToBoolean(reader["ESTADO_BOD"]);
                return bodega;
            }
            catch (Exception)
            {

                throw;
            }
        }

    }
}
