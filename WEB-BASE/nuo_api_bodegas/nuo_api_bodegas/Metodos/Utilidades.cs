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
        public static Perfiles MapearPerfiles(SqlDataReader reader)
        {
            return new Perfiles()
            {
                Codigo = Convert.ToInt32(reader["CODIGO_PUS"]),
                Nombre = Convert.ToString(reader["NOMBRE_PUS"]),
                Descripcion = Convert.ToString(reader["DESCRIPCION_PUS"]),
                EstaActivo = Convert.ToBoolean(reader["ESTAACTIVO_PUS"])
            };

        }

        public static Respuesta MapearRespuesta(SqlDataReader reader)
        {
            return new Respuesta()
            {
                valor = Convert.ToInt32(reader["RESPUESTA"]).ToString()
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
                usuario.EstaActivo = Convert.ToString(reader["ESTADO_USR"].ToString()) == "1" ? true : false;
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




    }
}
