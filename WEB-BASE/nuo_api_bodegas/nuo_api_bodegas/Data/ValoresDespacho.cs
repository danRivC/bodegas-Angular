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
    public class ValoresDespacho
    {
        private readonly string _connectionString;
        private readonly IConfiguration _configuration;
        public ValoresDespacho(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("defaultConnection");
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
        }

        public async Task<BaseResponse> InsertaDespacho(Despacho entrada)
        {
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                BaseResponse response = new BaseResponse();
                response.resultado = new List<object>();
                int codigoMovimiento = 0;
                try
                {
                    using (SqlCommand cmd = new SqlCommand("SP_INSERTA_SALIDA", sql))
                    {
                        cmd.Parameters.Add(new SqlParameter("@CODIGO_PRO", entrada.producto));
                        cmd.Parameters.Add(new SqlParameter("@CODIGO_BOD", entrada.bodega));
                        cmd.Parameters.Add(new SqlParameter("@CANTIDAD_INV", entrada.cantidad));
                        cmd.Parameters.Add(new SqlParameter("@DETALLE_SAL", entrada.detalle));
                        cmd.Parameters.Add(new SqlParameter("@CODIGO_UBI", entrada.ubicacion));
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
                                codigoMovimiento = Convert.ToInt32(reader["RESPUESTA"]);
                                _respuesta = Utilidades.MapearRespuesta(reader);
                                response.resultado.Add(_respuesta);
                            }
                        }
                        
                        await InsertaActualizaInventario(entrada);
                        await InsertaMovimiento(entrada, 0, codigoMovimiento);

                    }
                    return response;

                }
                catch (Exception er)
                {
                    response.status = "correcto";
                    response.mensaje = "No se pudo guardar la entrada " + er.Message;
                    response.codigo = "410";
                    return response;
                }
            }
        }

        public async Task<BaseResponse> InsertaMovimiento(Despacho despacho, int tipoMovimiento, int codigoMovimiento)
        {
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                BaseResponse response = new BaseResponse();
                response.resultado = new List<object>();
                try
                {
                    using (SqlCommand cmd = new SqlCommand("SP_INSERTA_MOVIMIENTO", sql))
                    {
                        cmd.Parameters.Add(new SqlParameter("@CODIGO_PRD", despacho.producto));
                        cmd.Parameters.Add(new SqlParameter("@CODIGO_BOD", despacho.bodega));
                        cmd.Parameters.Add(new SqlParameter("@CODIGO_UBI", despacho.ubicacion));
                        cmd.Parameters.Add(new SqlParameter("@CANTIDAD_MVI", despacho.cantidad));
                        cmd.Parameters.Add(new SqlParameter("@DESCRIPCION_MVI", despacho.detalle));
                        if (codigoMovimiento>0)
                        {
                            if (tipoMovimiento == 1)
                            {
                                cmd.Parameters.Add(new SqlParameter("@CODIGO_ENT", codigoMovimiento));
                            }
                            else
                            {
                                cmd.Parameters.Add(new SqlParameter("@CODIGO_SAL", codigoMovimiento));
                            }
                        }
                        
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        response.status = "correcto";
                        response.mensaje = "Movimiento Guardado Correctamente";
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

                    }

                }
                catch (Exception)
                {
                    response.status = "correcto";
                    response.mensaje = "No se pudo guardar la ciudad";
                    response.codigo = "410";

                }
                return response;
            }
        }
        public async Task InsertaActualizaInventario(Despacho despacho)
        {
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                BaseResponse response = new BaseResponse();
                response.resultado = new List<object>();
                try
                {
                    using (SqlCommand cmd = new SqlCommand("SP_INSERTA_ACTUALIZA_INVENTARIO", sql))
                    {
                        cmd.Parameters.Add(new SqlParameter("@CODIGO_PRO", despacho.producto));
                        cmd.Parameters.Add(new SqlParameter("@CODIGO_BOD", despacho.bodega));
                        cmd.Parameters.Add(new SqlParameter("@CANTIDAD_INV", despacho.cantidad));
                        cmd.Parameters.Add(new SqlParameter("@CODIGO_UBI", despacho.ubicacion));
                        cmd.Parameters.Add(new SqlParameter("@OPERACION", "S"));
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

                    }
                }
                catch (Exception)
                {
                    response.status = "correcto";
                    response.mensaje = "No se pudo guardar la ciudad";
                    response.codigo = "410";

                }
            }
        }


        public async Task<BaseResponse> DevuelveDetalleEntrada(int id, string fecha_inicio, string fecha_final)
        {
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                BaseResponse response = new BaseResponse();
                response.resultado = new List<object>();
                try
                {
                    using (SqlCommand cmd = new SqlCommand("SP_DEVUELVE_SALIDAS", sql))
                    {

                        cmd.Parameters.Add(new SqlParameter("@CODIGO_BOD", id));
                        if (fecha_inicio != null && fecha_final != null)
                        {
                            cmd.Parameters.Add(new SqlParameter("@FECHA_FINAL", Convert.ToDateTime(fecha_final)));
                            cmd.Parameters.Add(new SqlParameter("@FECHA_INCIO", Convert.ToDateTime(fecha_inicio)));
                        }

                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        response.status = "correcto";
                        response.mensaje = "Ciudad Guardada Correctamente";
                        DespachoDetalle entrada = new DespachoDetalle();
                        response.codigo = "201";
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                entrada = MapearSalidaDetalle(reader);
                                response.resultado.Add(entrada);
                            }
                        }

                    }
                }
                catch (Exception)
                {
                    response.status = "correcto";
                    response.mensaje = "No se pudo guardar la ciudad";
                    response.codigo = "410";

                }
                return response;
            }


        }


        public DespachoDetalle MapearSalidaDetalle(SqlDataReader reader)
        {
            DespachoDetalle entrada = new DespachoDetalle();
            entrada.fecha = Convert.ToDateTime(reader["FECHA_MVI"]);
            entrada.nombre = Convert.ToString(reader["NOMBRE_PRO"]);
            try
            {
                entrada.serie = Convert.ToString(reader["NUM_SERIE_PRO"]);
            }
            catch (Exception)
            {

                entrada.serie = "";
            }
            entrada.parte = Convert.ToString(reader["NUM_PART_PRO"]);
            entrada.cantidad = Convert.ToInt32(reader["CANTIDAD_SAL"]);
            entrada.proveedor = Convert.ToString(reader["NOMBRE_PRV"]);
            entrada.modelo = Convert.ToString(reader["NOMBRE_MODELO"]);
            entrada.bodega = Convert.ToString(reader["NOMBRE_BOD"]);
            entrada.detalle = Convert.ToString(reader["DETALLE_SAL"]);
            return entrada;


        }
    }
}
