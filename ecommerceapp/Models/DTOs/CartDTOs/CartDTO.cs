using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ecommerceapp.Models.Domain;

namespace ecommerceapp.Models.DTOs.Cart
{
    public class CartDTO
    {
        public int Id { get; set; }
        public ICollection<CartItem>? CartItems { get; set; }
    }
}
