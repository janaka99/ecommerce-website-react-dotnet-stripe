using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ecommerceapp.Models.Domain
{
    public class OrderItem
    {
        public int Id { get; set; }

        [Required]
        [Range(1, 500)]
        public required decimal Price { get; set; }
        public int ProductId { get; set; }
        public int OrderId { get; set; }
        public Order? Order { get; set; }
        public Product? Product { get; set; }
    }
}
