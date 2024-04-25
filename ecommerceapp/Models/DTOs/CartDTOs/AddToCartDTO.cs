using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ecommerceapp.Models.DTOs.CartDTOs
{
    public class AddToCartDTO
    {
        [Required]
        public int ProductId { get; set; }
    }
}