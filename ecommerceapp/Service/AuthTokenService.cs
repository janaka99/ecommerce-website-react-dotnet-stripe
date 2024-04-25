using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using ecommerceapp.Interfaces.Service;
using ecommerceapp.Models.Domain;
using Microsoft.IdentityModel.Tokens;

namespace ecommerceapp.Service
{
    public class AuthTokenService : ITokenService
    {
        private readonly IConfiguration _config;
        private readonly SymmetricSecurityKey _key;

        public AuthTokenService(IConfiguration config)
        {
            _config = config;
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWT:SigningKey"]!));
        }

        public string? CreateToken(User user, IList<string> userRoles)
        {
            try
            {
                var claims = new List<Claim>
                {
                    new Claim(JwtRegisteredClaimNames.Email, user.Email!),
                    new Claim(JwtRegisteredClaimNames.GivenName, user.UserName!),
                    new Claim(JwtRegisteredClaimNames.Sub, user.Id)
                };
                foreach (var role in userRoles)
                {
                    claims.Add(new Claim(ClaimTypes.Role, role));
                }

                var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);
                var tokenDescription = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(claims),
                    Expires = DateTime.Now.AddDays(7),
                    SigningCredentials = creds,
                    Issuer = _config["JWT:Issuer"],
                    Audience = _config["JWT:Audience"],
                };

                var tokenHandler = new JwtSecurityTokenHandler();

                var token = tokenHandler.CreateToken(tokenDescription);

                return tokenHandler.WriteToken(token);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return null;
            }
        }
    }
}
