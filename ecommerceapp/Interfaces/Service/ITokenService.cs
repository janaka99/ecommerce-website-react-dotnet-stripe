using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ecommerceapp.Models.Domain;

namespace ecommerceapp.Interfaces.Service
{
    public interface ITokenService
    {
        string? CreateToken(User user, IList<string> userRoles);
    }
}
