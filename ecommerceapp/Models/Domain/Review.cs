using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ecommerceapp.Models.Domain
{
    public class Review
    {
        public int Id { get; set; }

        [Required]
        [Range(1, 6)]
        public required int Rating { get; set; }

        [Required]
        [StringLength(200)]
        public required string Comment { get; set; }

        public required string UserId { get; set; }

        public int ProductId { get; set; }

        public Product? Product { get; set; }

        public User? User { get; set; }
        public DateTime Created_at { get; set; }
    }
}
