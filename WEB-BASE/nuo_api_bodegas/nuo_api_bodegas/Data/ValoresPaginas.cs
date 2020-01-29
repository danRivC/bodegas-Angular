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
    public class ValoresPaginas
    {
        private readonly string _connectionString;
        public ValoresPaginas(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("defaultConnection");
        }
        public async Task<BaseResponse> GetByAdminId(int id, string ab_estado)
        {
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                BaseResponse response = new BaseResponse();
                response.resultado = new List<object>();
                
                try
                {
                    using (SqlCommand cmd = new SqlCommand("SP_DEVUELVE_PAGINAS_USUARIO", sql))
                    {
                        cmd.Parameters.Add(new SqlParameter("@ID", id));
                        cmd.Parameters.Add(new SqlParameter("@ACTIVO_PAG", ab_estado == "true" ? 1 : 0));
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        response.status = "correcto";
                        response.mensaje = "Consulta Correcta";
                        Pagina _pagina = new Pagina();
                        response.codigo = "201";
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                _pagina = Utilidades.MapearPaginas(reader);
                                response.resultado.Add(_pagina);
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

       
    }
}
