using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ecommerceapp.Models.DTOs.Account
{
    public class UpdatePasswordDTO
    {
        [Required]
        [MinLength(8, ErrorMessage = "Password must be at least 8 characters long")]
        public required string NewPassword { get; set; }

        [Required]
        [MinLength(8, ErrorMessage = "Old Password must be at least 8 characters long")]
        public required string CurrentPassword { get; set; }
    }
}
