using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ecommerceapp.Models.Domain
{
    public class Product
    {
        public int Id { get; set; }

        [Required]
        [StringLength(250)]
        public required string Title { get; set; }

        [Required]
        [Range(1, 100)]
        public decimal Price { get; set; }

        [Required]
        [StringLength(250)]
        public string? Picture { get; set; }

        [Required]
        [StringLength(250)]
        public string? PicturePublicId { get; set; }

        [Required]
        [StringLength(700)]
        public required string Description { get; set; }

        public DateTime Created_at { get; set; }
        public DateTime Updated_at { get; set; }

        public int Sold { get; set; } = 0;

        public int CategoryId { get; set; }
        public Category? Category { get; set; }

        public ICollection<Review> Reviews { get; set; } = new List<Review>();
    }
}
