using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ecommerceapp.Models.DTOs.OrderDTOs
{
    public class CreateOrderDTO
    {
        [Required]
        public required int CartId { get; set; }
    }
}
