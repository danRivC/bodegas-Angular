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
    public class ValoresProveedores
    {

        private readonly string _connectionString;
        private readonly IConfiguration _configuration;
        
        public ValoresProveedores(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("defaultConnection");
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
        }

        public async Task<BaseResponse>ListaProveedores()
        {
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                BaseResponse response = new BaseResponse();
                response.resultado = new List<object>();
                try
                {
                    using (SqlCommand cmd = new SqlCommand("SP_DEVUELVE_LISTA_PROVEEDORES", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        response.status = "correcto";
                        response.mensaje = "Consulta Correcta";
                        Proveedor _proveedor = new Proveedor();
                        response.codigo = "201";
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                _proveedor = MapearProveedor(reader);
                                response.resultado.Add(_proveedor);
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

        public async Task<BaseResponse> InsertaActualizaProveedores(Proveedor proveedor)
        {
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                BaseResponse response = new BaseResponse();
                response.resultado = new List<object>();
                try
                {
                    using (SqlCommand cmd = new SqlCommand("SP_INSERTA_ACTUALIZA_PROVEEDOR", sql))
                    {
                        cmd.Parameters.Add(new SqlParameter("@CODIGO_PRV", proveedor.codigo));
                        cmd.Parameters.Add(new SqlParameter("@NOMBRE_PRV", proveedor.nombre));
                        cmd.Parameters.Add(new SqlParameter("@ESTADO_PRV", proveedor.estado));
                        cmd.Parameters.Add(new SqlParameter("@RUC_PRV", proveedor.ruc));
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
                    response.mensaje = "No se pudo guardar la ciudad";
                    response.codigo = "410";
                    return response;
                }
            }
        }

        public async Task<BaseResponse> DevuelveProveedor(int codigo)
        {
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                BaseResponse response = new BaseResponse();
                response.resultado = new List<object>();
                try
                {
                    using (SqlCommand cmd = new SqlCommand("SP_DEVUELVE_PROVEEDOR", sql))
                    {
                        cmd.Parameters.Add(new SqlParameter("@CODIGO_PRV", codigo));
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        response.status = "correcto";
                        response.mensaje = "Consulta Correcta";
                        Proveedor _proveedor = new Proveedor();
                        response.codigo = "201";
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                _proveedor = MapearProveedor(reader);
                                response.resultado.Add(_proveedor);
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

        public static Proveedor MapearProveedor(SqlDataReader reader)
        {
            Proveedor proveedor = new Proveedor();
            proveedor.codigo = Convert.ToInt32(reader["CODIGO_PRV"]);
            proveedor.nombre = Convert.ToString(reader["NOMBRE_PRV"]);
            proveedor.estado = Convert.ToBoolean(reader["ESTADO_PRV"]);
            proveedor.ruc = Convert.ToString(reader["RUC_PRV"]);
            return proveedor;
        }
    }
}
