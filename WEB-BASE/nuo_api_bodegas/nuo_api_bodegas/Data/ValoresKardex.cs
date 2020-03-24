using Microsoft.Extensions.Configuration;
using nuo_api_bodegas.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace nuo_api_bodegas.Data
{
    public class ValoresKardex
    {

        private readonly string _connectionString;
        private readonly IConfiguration _configuration;

        public ValoresKardex(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("defaultConnection");
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
        }

        public async Task<BaseResponse> ListaProductosKardex(int id)
        {
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                BaseResponse response = new BaseResponse();
                response.resultado = new List<object>();
                try
                {
                    using (SqlCommand cmd = new SqlCommand("SP_DEVUELVE_PRODUCTOS_KARDEX", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@CODIGO_CIU", id));
                        response.status = "correcto";
                        response.mensaje = "Consulta Correcta";
                        Kardex kardex = new Kardex();
                        response.codigo = "201";
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                kardex = MapearKardex(reader);
                                response.resultado.Add(kardex);
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

        public async Task<BaseResponse> MovimientoKardex(int bodega, int codigo, string fecha_inicio, string fecha_final)
        {
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                BaseResponse response = new BaseResponse();
                response.resultado = new List<object>();
                try
                {
                    using (SqlCommand cmd = new SqlCommand("SP_LISTA_KARDEX_PRODUCTO_BODEGA", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@CODIGO_BOD", bodega));
                        cmd.Parameters.Add(new SqlParameter("@CODIGO_PRO", codigo));
                        if (fecha_inicio != null && fecha_final != null)
                        {
                            cmd.Parameters.Add(new SqlParameter("@FECHA_FINAL", Convert.ToDateTime(fecha_final)));
                            cmd.Parameters.Add(new SqlParameter("@FECHA_INCIO", Convert.ToDateTime(fecha_inicio)));
                        }
                        response.status = "correcto";
                        response.mensaje = "Consulta Correcta";
                        KardexLista kardexLista = new KardexLista();
                        response.codigo = "201";
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                kardexLista = MapearKardexLista(reader);
                                response.resultado.Add(kardexLista);
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


        public KardexLista MapearKardexLista(SqlDataReader reader)
        {
            KardexLista kardex = new KardexLista();
            kardex.descripcion = Convert.ToString(reader["DESCRIPCION_MVI"]);
            kardex.fecha = Convert.ToDateTime(reader["FECHA_MVI"]);
            try
            {
                kardex.entrada = Convert.ToInt32(reader["CANTIDAD_ENT"]);
            }
            catch (Exception)
            {

                kardex.entrada = 0;
            }
            try
            {
                kardex.salida = Convert.ToInt32(reader["CANTIDAD_SAL"]);
            }
            catch (Exception)
            {

                kardex.salida = 0;
            }
            try
            {
                kardex.stock = Convert.ToInt32(reader["STOCK_MVI"]);
            }
            catch (Exception)
            {

                kardex.stock = 0;
            }
            
            
            
            return kardex;
        }

        public Kardex MapearKardex(SqlDataReader reader)
        {
            Kardex kardex = new Kardex();
            kardex.nombre = Convert.ToString(reader["NOMBRE_PRO"]);
            kardex.parte = Convert.ToString(reader["NUM_PART_PRO"]);
            kardex.bodega = Convert.ToString(reader["NOMBRE_BOD"]);
            kardex.cantidad = Convert.ToInt32(reader["CANTIDAD"]);
            kardex.codigo_bod = Convert.ToInt32(reader["CODIGO_BOD"]);
            kardex.codigo = Convert.ToInt32(reader["CODIGO_PRO"]);
            
            return kardex;
        }

    }
}
