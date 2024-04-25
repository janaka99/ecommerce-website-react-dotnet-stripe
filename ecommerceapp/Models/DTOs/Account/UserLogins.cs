using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ecommerceapp.Models.DTOs.Account
{
    public class UserLogins
    {
        public required NewUserDto LoggedUser { get; set; }
        public string? Token { get; set; }
    }
}
