using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ecommerceapp.Models.DTOs.Account
{
    public class NewUserDto
    {
        public required string UserName { get; set; }
        public required string Email { get; set; }
        public required string Role { get; set; }
        public string? Avatar { get; set; }
    }
}
