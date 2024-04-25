using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ecommerceapp.Models.Domain
{
    public class Category
    {
        public int Id { get; set; }

        [Required]
        [Range(1, 100)]
        public required string Name { get; set; }

        [Required]
        [StringLength(300)]
        public required string Description { get; set; }

        public DateTime Created_at { get; set; }
        public DateTime Updated_at { get; set; }
    }
}
