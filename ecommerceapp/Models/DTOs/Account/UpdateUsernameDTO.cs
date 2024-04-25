using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ecommerceapp.Models.DTOs.Account
{
    public class UpdateUsernameDTO
    {
        [Required]
        public required string UserName { get; set; }
    }
}
