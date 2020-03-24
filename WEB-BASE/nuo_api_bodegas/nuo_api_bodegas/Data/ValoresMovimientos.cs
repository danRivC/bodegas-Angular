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
    public class ValoresMovimientos
    {
        private readonly string _connectionString;
        private readonly IConfiguration _configuration;

        public ValoresMovimientos(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("defaultConnection");
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
        }
        public async Task<BaseResponse> DevuelveMovimientoProducto(int id)
        {
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                BaseResponse response = new BaseResponse();
                response.resultado = new List<object>();
                try
                {
                    using (SqlCommand cmd = new SqlCommand("SP_DEVUELVE_MOVIMIENTO_PRODUCTO", sql))
                    {
                        cmd.Parameters.Add(new SqlParameter("@CODIGO_PRO", id));
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        response.status = "correcto";
                        response.mensaje = "Consulta Correcta";
                        Movimiento movimiento = new Movimiento();
                        response.codigo = "201";
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                response.resultado.Add(movimiento);
                            }
                        }
                        return response;
                    }
                }
                catch (Exception er)
                {
                    Utilidades.IngresaError("DevuelveMovimientoProducto", id.ToString(), er.Message, _connectionString);
                    throw;
                }
            }
        }


        public async Task<BaseResponse> InsertaActualizaMovimiento(Movimiento movimiento)
        {
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
               
                
                try
                {
                    string tipoMovi = "M";
                    BaseResponse response = new BaseResponse();
                    response.resultado = new List<object>();
                    int codigoMovimiento = await InsertaDespacho(movimiento);
                    await InsertaMovimiento(movimiento, 0, Convert.ToInt32(codigoMovimiento));
                    
                    

                    using (SqlCommand cmd = new SqlCommand("SP_INSERTA_ACTUALIZA_INVENTARIO", sql))
                    {
                        cmd.Parameters.Add(new SqlParameter("@CODIGO_PRO", movimiento.producto));
                        cmd.Parameters.Add(new SqlParameter("@CANTIDAD_INV", movimiento.cantidad));
                        cmd.Parameters.Add(new SqlParameter("@CODIGO_BOD", movimiento.bodega));
                        cmd.Parameters.Add(new SqlParameter("@CODIGO_UBI", movimiento.ubicacion));
                        cmd.Parameters.Add(new SqlParameter("@OPERACION", tipoMovi));
                        cmd.Parameters.Add(new SqlParameter("@CODIGO_BOD_ANT", movimiento.bodegaAnt));
                        cmd.Parameters.Add(new SqlParameter("@CODIGO_UBI_ANT", movimiento.ubicacionAnt));
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
                        
                        
                    }
                    codigoMovimiento = await InsertaEntrada(movimiento);
                    await InsertaMovimiento(movimiento, 1, Convert.ToInt32(codigoMovimiento));


                    return response;
                }
                catch (Exception er)
                {
                    string elementos = "@CDIGO_PRO "+ movimiento.producto+
                    "@CANTIDAD_INV  "+ movimiento.cantidad+
                    "@CODIGO_BOD "+ movimiento.bodega+
                    "@CODIGO_UBI "+ movimiento.ubicacion+
                    "@OPERACION "+ "M"+
                    "@CODIGO_BOD_ANT "+ movimiento.bodegaAnt+
                    "@CODIGO_UBI_ANT "+ movimiento.ubicacionAnt;


                    Utilidades.IngresaError("Inserta Actualiza Movimiento", movimiento.ToString(), er.Message, _connectionString);
                    throw;
                }
            }
        }

        public async Task<BaseResponse> InsertaMovimiento(Movimiento movimiento, int tipoMovimiento, int codigoMovimiento)
        {
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                BaseResponse response = new BaseResponse();
                response.resultado = new List<object>();
                try
                {
                    using (SqlCommand cmd = new SqlCommand("SP_INSERTA_MOVIMIENTO", sql))
                    {
                        cmd.Parameters.Add(new SqlParameter("@CODIGO_PRD", movimiento.producto));
                        cmd.Parameters.Add(new SqlParameter("@CODIGO_BOD", tipoMovimiento == 1 ? movimiento.bodega: movimiento.bodegaAnt));
                        cmd.Parameters.Add(new SqlParameter("@CODIGO_UBI", tipoMovimiento ==1? movimiento.ubicacion: movimiento.ubicacionAnt));
                        cmd.Parameters.Add(new SqlParameter("@CANTIDAD_MVI", movimiento.cantidad));
                        cmd.Parameters.Add(new SqlParameter("@DESCRIPCION_MVI", movimiento.detalle));
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
                catch (Exception er)
                {
                    Utilidades.IngresaError("Inserta Movimiento", movimiento.ToString(), er.Message, _connectionString);
                    throw;

                }
                return response;
            }
        }
        public async Task<int> InsertaEntrada(Movimiento movimiento)
        {
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                BaseResponse response = new BaseResponse();
                int codigoMovimiento = 0; 
                response.resultado = new List<object>();
                try
                {
                    using (SqlCommand cmd = new SqlCommand("SP_INSERTA_ENTRADA", sql))
                    {
                        cmd.Parameters.Add(new SqlParameter("@CODIGO_PRO", movimiento.producto));
                        cmd.Parameters.Add(new SqlParameter("@CODIGO_BOD", movimiento.bodega));
                        cmd.Parameters.Add(new SqlParameter("@CANTIDAD_INV", movimiento.cantidad));
                        cmd.Parameters.Add(new SqlParameter("@DETALLE_ENT", movimiento.detalle));
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
                            }
                        }
                    }
                    return codigoMovimiento;
                }
                catch (Exception er)
                {
                    Utilidades.IngresaError("Inserta Entrada", movimiento.ToString(), er.Message, _connectionString);
                    throw;

                }
            }
        }

        public async Task<int> InsertaDespacho(Movimiento movimiento)
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
                        cmd.Parameters.Add(new SqlParameter("@CODIGO_PRO", movimiento.producto));
                        cmd.Parameters.Add(new SqlParameter("@CODIGO_BOD", movimiento.bodegaAnt));
                        cmd.Parameters.Add(new SqlParameter("@CANTIDAD_INV", movimiento.cantidad));
                        cmd.Parameters.Add(new SqlParameter("@DETALLE_SAL", movimiento.detalle));
                        cmd.Parameters.Add(new SqlParameter("@CODIGO_UBI", movimiento.ubicacionAnt));
                        cmd.Parameters.Add(new SqlParameter("@CODIGO_BOD_DESTINO_SAL", movimiento.bodega));
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
                                
                            }
                        }
                        return codigoMovimiento;
                    }
                    

                }
                catch (Exception er)
                {
                    string elementos = "@CODIGO_PRO " + movimiento.producto +
                    "@CODIGO_BOD " + movimiento.bodegaAnt +
                    "@CANTIDAD_INV " + movimiento.cantidad +
                    "@DETALLE_SAL " + movimiento.detalle +
                    "@CODIGO_UBI " + movimiento.ubicacionAnt +
                    "@CODIGO_BOD_DESTINO_SAL " + movimiento.bodega;


                    Utilidades.IngresaError("Inserta Despacho", elementos.ToString(), er.Message, _connectionString);
                    throw;
                }
            }
        }
    }
}
