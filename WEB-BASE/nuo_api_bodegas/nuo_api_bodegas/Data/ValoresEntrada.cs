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
    public class ValoresEntrada
    {
        private readonly string _connectionString;
        private readonly IConfiguration _configuration;
        public ValoresEntrada(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("defaultConnection");
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
        }
        public async Task<BaseResponse> InsertaEntrada(Entrada entrada)
        {
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                BaseResponse response = new BaseResponse();
                response.resultado = new List<object>();
                try
                {
                    using (SqlCommand cmd = new SqlCommand("SP_INSERTA_ENTRADA", sql))
                    {
                        cmd.Parameters.Add(new SqlParameter("@CODIGO_PRO", entrada.producto));
                        cmd.Parameters.Add(new SqlParameter("@CODIGO_BOD", entrada.bodega));
                        cmd.Parameters.Add(new SqlParameter("@CANTIDAD_INV", entrada.cantidad));
                        cmd.Parameters.Add(new SqlParameter("@DETALLE_ENT", entrada.detalle));
                        int codigoMovimeinto = 0;
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
                                codigoMovimeinto = Convert.ToInt32(reader["RESPUESTA"]);
                                
                            }
                        }
                        await InsertaActualizaInventario(entrada);
                        await InsertaMovimiento(entrada, 1, codigoMovimeinto);

                    }
                    return response;

                }
                catch (Exception er)
                {
                    response.status = "correcto";
                    response.mensaje = "No se pudo guardar la entrada "+ er.Message ;
                    response.codigo = "410";
                    return response;
                }
            }
        }


        public async Task<BaseResponse> InsertaMovimiento(Entrada entrada, int tipoMovimiento, int codigoMovimiento)
        {
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                BaseResponse response = new BaseResponse();
                response.resultado = new List<object>();
                try
                {
                    using (SqlCommand cmd = new SqlCommand("SP_INSERTA_MOVIMIENTO", sql))
                    {
                        cmd.Parameters.Add(new SqlParameter("@CODIGO_PRD", entrada.producto));
                        cmd.Parameters.Add(new SqlParameter("@CODIGO_BOD", entrada.bodega));
                        cmd.Parameters.Add(new SqlParameter("@CODIGO_UBI", entrada.ubicacion));
                        cmd.Parameters.Add(new SqlParameter("@CANTIDAD_MVI", entrada.cantidad));
                        cmd.Parameters.Add(new SqlParameter("@DESCRIPCION_MVI", entrada.detalle));
                        if (codigoMovimiento > 0)
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
        public async Task InsertaActualizaInventario(Entrada entrada)
        {
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                BaseResponse response = new BaseResponse();
                response.resultado = new List<object>();
                try
                {
                    using (SqlCommand cmd = new SqlCommand("SP_INSERTA_ACTUALIZA_INVENTARIO", sql))
                    {
                        cmd.Parameters.Add(new SqlParameter("@CODIGO_PRO", entrada.producto));
                        cmd.Parameters.Add(new SqlParameter("@CODIGO_BOD", entrada.bodega));
                        cmd.Parameters.Add(new SqlParameter("@CANTIDAD_INV", entrada.cantidad));
                        cmd.Parameters.Add(new SqlParameter("@CODIGO_UBI", entrada.ubicacion));
                        cmd.Parameters.Add(new SqlParameter("@OPERACION", "I"));
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
                    using (SqlCommand cmd = new SqlCommand("SP_DEVUELVE_LISTA_ENTRADAS", sql))
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
                        EntradaDetalle entrada = new EntradaDetalle();
                        response.codigo = "201";
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                entrada = MapearEntradaDetalle(reader);
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


        public EntradaDetalle MapearEntradaDetalle(SqlDataReader reader)
        {
            EntradaDetalle entrada = new EntradaDetalle();
            entrada.fecha = Convert.ToDateTime(reader["FECHA_CREACION_ENT"]);
            entrada.nombre = Convert.ToString(reader["NOMBRE_PRO"]);
            try
            {
                entrada.serie = Convert.ToString(reader["NUM_SERIE_PRO"]);
            }
            catch (Exception)
            {

                entrada.serie = "";
            }
            entrada.parte =  Convert.ToString(reader["NUM_PART_PRO"]);
            entrada.cantidad = Convert.ToInt32(reader["CANTIDAD_ENT"]);
            entrada.proveedor = Convert.ToString(reader["NOMBRE_PRV"]);
            entrada.modelo = Convert.ToString(reader["NOMBRE_MODELO"]);
            entrada.ubicacion = Convert.ToString(reader["DESCRIPCION_UBI"]);
            entrada.detalle = Convert.ToString(reader["DETALLE_ENT"]);
            return entrada;


        }

    }
}
