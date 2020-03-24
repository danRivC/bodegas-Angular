using System;
using System.Collections.Generic;
using System.DirectoryServices;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using nuo_api_bodegas.Data;
using nuo_api_bodegas.Models;
using ServiceReference1;

namespace nuo_api_bodegas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly ValoresLogin _login;
        private readonly IConfiguration _configuration;
        private readonly WSFicheroMedicoSoap _wSFicheroMedicoSoap;

        public LoginController(ValoresLogin login, IConfiguration configuration)
        {
            _login = login ?? throw new ArgumentNullException(nameof(login));
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
        }
        

        
        
        


        [HttpPost]
        public async Task<ActionResult<BaseResponse>> Post([FromBody] Login login)
        {
            BaseResponse response = new BaseResponse();
            response.resultado = new List<object>();
            
            try
            {
                
                
                using (DirectoryEntry adsEntry = new DirectoryEntry("LDAP://172.20.10.10", login.Usuario, login.Password))
                {
                    DirectorySearcher searcher = new DirectorySearcher(adsEntry)
                    {
                        PageSize = int.MaxValue,
                        Filter = "(sAMAccountName=" + login.Usuario + ")"
                    };
                    searcher.PropertiesToLoad.Add("cn");
                    SearchResult result = searcher.FindOne();
                    return await _login.LoginByUsername(login);
                }
            }
            catch (Exception er)
            {
                return NotFound();
            }            
        }
        private UserToken ConstruirToken (Login login)
        {
            try
            {
                var claims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.UniqueName, login.Usuario),
                    new Claim("Nuo Tecnologica", "Departamento I+D"),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                };
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:key"]));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var expiration =  DateTime.UtcNow.AddDays(1);

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