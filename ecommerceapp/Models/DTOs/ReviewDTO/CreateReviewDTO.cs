using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ecommerceapp.Models.DTOs.ReviewDTO
{
    public class CreateReviewDTO
    {
        [Required]
        public int ProductId { get; set; }

        [Required]
        public int OrderId { get; set; }

        [Required]
        [Range(0, 6)]
        public int Rating { get; set; }

        [Required]
        [StringLength(250)]
        public required string Comment { get; set; }
    }
}
