using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using nuo_api_bodegas.Metodos;
using nuo_api_bodegas.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace nuo_api_bodegas.Data
{
    public class ValoresLogin
    {
        private readonly string _connectionString;
        private readonly IConfiguration _configuration;

        public ValoresLogin(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("defaultConnection");
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
        }

        public async Task<BaseResponse> LoginByUsername(Login login)
        {
            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                BaseResponse response = new BaseResponse();
                response.resultado = new List<object>();
                try
                {
                    using (SqlCommand cmd = new SqlCommand("SP_DEVUELVE_USUARIO", sql))
                    {
                        cmd.Parameters.Add(new SqlParameter("@username", login.Usuario));
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        response.status = "correcto";
                        response.mensaje = "Consulta Correcta";
                        Usuario _usuario = new Usuario();
                        response.codigo = "201";
                        await sql.OpenAsync();
                        using (var reader = await cmd.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                _usuario = Utilidades.MapToUsuario(reader);
                                response.resultado.Add(_usuario);
                                
                            }
                            if (reader.HasRows)
                            {
                                UserToken token = new UserToken();
                                token = ConstruirToken(login);
                                response.resultado.Add(token);
                            }
                            else
                            {
                                cmd.Parameters.Add(new SqlParameter("@username", login.Usuario));
                                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                                response.status = "error";
                                response.mensaje = "El usuario y contraseña no están registrados en el sistema";
                                response.codigo = "401";
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
        private UserToken ConstruirToken(Login login)
        {

            try
            {
                var claims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.UniqueName, login.Usuario),
                    new Claim("Nuo Tecnologica", "Departamento I+D"),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                };
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:key"]));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var expiration = DateTime.UtcNow.AddMonths(1);

                JwtSecurityToken token = new JwtSecurityToken(
                    issuer: null,
                    audience: null,
                    claims: claims,
                    expires: expiration,
                    signingCredentials: creds
                    );
                return new UserToken()
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    expiracion = expiration
                };


            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
