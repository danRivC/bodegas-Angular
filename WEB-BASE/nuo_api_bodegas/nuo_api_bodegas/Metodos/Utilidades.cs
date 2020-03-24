using Microsoft.Extensions.Configuration;
using nuo_api_bodegas.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace nuo_api_bodegas.Metodos
{
    public class Utilidades
    {
        private readonly string _connectionString;
        private readonly IConfiguration _configuration;
        public Utilidades(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("defaultConnection");
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
        }

        public static Perfiles MapearPerfiles(SqlDataReader reader)
        { 
            return new Perfiles()
            {
                Codigo = Convert.ToInt32(reader["CODIGO_PUS"]),
                Nombre = Convert.ToString(reader["NOMBRE_PUS"]),
                Descripcion = Convert.ToString(reader["DESCRIPCION_PUS"]),
                EstaActivo = Convert.ToString(reader["ESTADO"])
                
            };

        }

        public static Respuesta MapearRespuesta(SqlDataReader reader)
        {
            return new Respuesta()
            {
                valor = Convert.ToString(reader["RESPUESTA"]).ToString(),
            };
        }


        public static Usuario MapToUsuario(SqlDataReader reader)
        {
            try
            {
                Usuario usuario = new Usuario();
                usuario.Codigo = Convert.ToInt32(reader["CODIGO_USR"]);
                usuario.Correo = (string)reader["CORREO_USR"];
                usuario.Nombre = (string)reader["NOMBRE_USR"];
                usuario.Apellido = (string)reader["APELLIDO_USR"];
                usuario.Username = (string)reader["ALIAS_USR"];
                usuario.EstaActivo = (string) reader["ESTADO"];
                usuario.Ciudad = Convert.ToInt32(reader["CODIGO_CIU"]);
                return usuario;
            }
            catch (Exception)
            {

                throw;
            }
        }


        public static Pagina MapearPaginas(SqlDataReader reader)
        {
            return new Pagina()
            {
                NombrePagina = Convert.ToString(reader["NOMBRE_PAG"]),
                LinkPagina = Convert.ToString(reader["LINK_PAG"]),
                EstadoPagina = Convert.ToString(reader["ACTIVO_PAG"]),
                GraficoPagina = Convert.ToString(reader["GRAFICO_PAG"]),
                CodigoPagina = Convert.ToInt32(reader["CODIGO_PAG"])
            };

        }

        public static PaginasDisponible MapearPaginasDisponibles(SqlDataReader reader)
        {
            return new PaginasDisponible()
            {
                CodigoPag = Convert.ToInt32(reader["CODIGO_PAG"]),
                NombrePag = Convert.ToString(reader["NOMBRE_PAG"]),
                EstadoMpe = Convert.ToInt32(reader["ESTADO_MPE"])
            };
        }

        public static void IngresaError(string descripcion, string parametros, string error, string conexion)
        {
            using (SqlConnection sql = new SqlConnection(conexion))
            {
                BaseResponse request = new BaseResponse();
                request.resultado = new List<object>();
                try
                {
                    using (SqlCommand cmd = new SqlCommand("SP_INGRESA_LOG", sql))
                    {
                        cmd.Parameters.Add(new SqlParameter("@DESCRIPCION_LOG", descripcion));
                        cmd.Parameters.Add(new SqlParameter("@PARAMETRO_ENV_LOG", parametros));
                        cmd.Parameters.Add(new SqlParameter("@ERROR_LOG", error));
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        request.status = "correcto";
                        request.mensaje = "Consulta Correcta";
                        Ubicacion ubicacion = new Ubicacion();
                        request.codigo = "201";
                        sql.Open();
                        using (var reader =  cmd.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                
                                request.resultado.Add(ubicacion);
                            }
                        }
                        
                    }
                }
                catch (Exception)
                {
                    throw;
                }
            }

        }




    }
}
