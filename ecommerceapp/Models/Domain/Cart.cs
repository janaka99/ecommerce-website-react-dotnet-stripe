using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ecommerceapp.Models.Domain
{
    public class Cart
    {
        public int Id { get; set; }

        public DateTime Created_at { get; set; }
        public DateTime Updated_at { get; set; }

        public required string UserId { get; set; }

        public User? User { get; set; }

        public required ICollection<CartItem> CartItems { get; set; }
    }
}
