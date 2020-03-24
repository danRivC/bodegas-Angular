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
    public class ValoresProductos
    {
        private readonly string _connectionString;
        private readonly IConfiguration _configuration;
        public ValoresProductos(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("defaultConnection");
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
        }
        public async Task<BaseResponse> DevuelveListaProductos()
        {
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                BaseResponse response = new BaseResponse();
                response.resultado = new List<object>();
                try
                {
                    using (SqlCommand cmd = new SqlCommand("SP_DEVUELVE_LISTA_PRODUCTOS", sql))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        response.status = "correcto";
                        response.mensaje = "Consulta Correcta";
                        Producto producto = new Producto();
                        response.codigo = "201";
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                producto = MapearProducto(reader);
                                response.resultado.Add(producto);
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

        public async Task<BaseResponse> DevuelveCantidad(int bodega, int ubicacion, int producto)
        {
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                BaseResponse response = new BaseResponse();
                response.resultado = new List<object>();
                try
                {
                    using (SqlCommand cmd = new SqlCommand("SP_DEVUELVE_CANTIDAD_PRODUCTO", sql))
                    {
                        cmd.Parameters.Add(new SqlParameter("@CODIGO_BOD", bodega));
                        cmd.Parameters.Add(new SqlParameter("@CODIGO_UBI", ubicacion));
                        cmd.Parameters.Add(new SqlParameter("@CODIGO_PRO", producto));
                        

                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        response.status = "correcto";
                        response.mensaje = "Producto Guardado Exitosamente";
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
                    response.mensaje = "No se pudo guardar el producto";
                    response.codigo = "410";
                    return response;
                }
            }
        }

        public async Task<BaseResponse> InsertaActualizaProducto(Producto producto)
        {
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                BaseResponse response = new BaseResponse();
                response.resultado = new List<object>();
                try
                {
                    using (SqlCommand cmd = new SqlCommand("SP_INSERTA_ACTUALIZA_PRODUCTOS", sql))
                    {
                        cmd.Parameters.Add(new SqlParameter("@CODIGO_PRO", producto.codigo_pr));
                        cmd.Parameters.Add(new SqlParameter("@CODIGO_MODELO", producto.modelo.codigo));
                        cmd.Parameters.Add(new SqlParameter("@CODIGO_TPR", producto.tipo.codigo));
                        cmd.Parameters.Add(new SqlParameter("@CODIGO_PRV", producto.proveedor.codigo));
                        cmd.Parameters.Add(new SqlParameter("@NOMBRE_PRO", producto.nombre_pr));
                        cmd.Parameters.Add(new SqlParameter("@NUM_PART_PRO", producto.numero_parte_pr));
                        cmd.Parameters.Add(new SqlParameter("@NUM_SERIE_PRO", producto.numero_serie_pr));
                        cmd.Parameters.Add(new SqlParameter("@ESTADO_PRO", producto.estado_pr));
                        
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        response.status = "correcto";
                        response.mensaje = "Producto Guardado Exitosamente";
                        Respuesta _respuesta = new Respuesta();
                        response.codigo = "201";
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                if (producto.codigo_pr == 0)
                                {
                                    
                                    producto.codigo_pr = Convert.ToInt32(reader["RESPUESTA"]);
                                    
                                }
                                response.resultado.Add(_respuesta);
                            }
                        }
                        return response;
                    }
                }
                catch (Exception)
                {
                    response.status = "correcto";
                    response.mensaje = "No se pudo guardar el producto";
                    response.codigo = "410";
                    return response;
                }
            }
        }

        

        public async Task InsertaSalida(SqlDataReader out_reader, int codigoBodega, int cantidadInventario)
        {

            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                BaseResponse response = new BaseResponse();
                response.resultado = new List<object>();
                try
                {
                    using (SqlCommand cmd = new SqlCommand("SP_INSERTA_SALIDA", sql))
                    {
                        cmd.Parameters.Add(new SqlParameter("@CODIGO_PRO", Convert.ToInt32(out_reader["RESPUESTA"])));
                        cmd.Parameters.Add(new SqlParameter("@CODIGO_BOD", codigoBodega));
                        
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



        public async Task InsertaEntrada(SqlDataReader out_reader, int codigoBodega, int cantidadInventario)
        {
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                BaseResponse response = new BaseResponse();
                response.resultado = new List<object>();
                try
                {
                    using (SqlCommand cmd = new SqlCommand("SP_INSERTA_ENTRADA", sql))
                    {
                        cmd.Parameters.Add(new SqlParameter("@CODIGO_PRO", Convert.ToInt32(out_reader["RESPUESTA"])));
                        cmd.Parameters.Add(new SqlParameter("@CODIGO_BOD", codigoBodega));
                        cmd.Parameters.Add(new SqlParameter("@CANTIDAD_INV", cantidadInventario));
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



        




       

        public async Task<BaseResponse> DevuelveProducto(int id)
        {
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                BaseResponse request = new BaseResponse();
                request.resultado = new List<object>();
                try
                {
                    using (SqlCommand cmd = new SqlCommand("SP_DEVUELVE_PRODUCTO", sql))
                    {
                        cmd.Parameters.Add(new SqlParameter("@CODIGO_PRO", id));
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        request.status = "correcto";
                        request.mensaje = "Consulta Correcta";
                        Producto ubicacion = new Producto();
                        request.codigo = "201";
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {  
                            while (await reader.ReadAsync())
                            {
                                ubicacion = MapearProducto(reader);
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
                                //ubicacion = MapearUbicacion(reader);
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

        public static Producto MapearProducto(SqlDataReader reader)
        {
            Producto producto = new Producto();
            
            producto.modelo = new Modelos();
            producto.tipo = new Tipo();
            producto.proveedor = new Proveedor();
            
            producto.codigo_pr = Convert.ToInt32(reader["CODIGO_PRO"]);
            producto.nombre_pr = Convert.ToString(reader["NOMBRE_PRO"]);
            producto.numero_parte_pr = Convert.ToString(reader["NUM_PART_PRO"]);
            producto.numero_serie_pr = Convert.ToString(reader["NUM_SERIE_PRO"]);
            producto.estado_pr = Convert.ToBoolean(reader["ESTADO_PRO"]);
            producto.modelo = ValoresModelos.MapearModelos(reader);
            producto.tipo = ValoresTipo.MapearTipo(reader);
            producto.proveedor = ValoresProveedores.MapearProveedor(reader);
            return producto;
            
        }

        

    }
}
