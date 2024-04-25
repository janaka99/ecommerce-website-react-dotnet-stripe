using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using ecommerceapp.Models.Domain.Enums;

namespace ecommerceapp.Models.Domain
{
    public class Order
    {
        public int Id { get; set; }

        public DateTime Created_at { get; set; }
        public OrderStatus status { get; set; }

        [Required]
        public required string UserId { get; set; }
        public User? User { get; set; }

        public required ICollection<OrderItem> OrderItems { get; set; }
    }
}
