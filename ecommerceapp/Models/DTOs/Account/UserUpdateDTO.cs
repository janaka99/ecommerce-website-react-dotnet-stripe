using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ecommerceapp.Models.DTOs.Account
{
    public class UserUpdateDTO
    {
        public string? Bio { get; set; }

        public string? PhoneNumber { get; set; }
    }
}
