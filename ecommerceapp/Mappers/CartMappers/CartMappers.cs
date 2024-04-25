using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ecommerceapp.Models.Domain;
using ecommerceapp.Models.DTOs.Cart;

namespace ecommerceapp.Mappers.CartMappers
{
    public static class CartMappers
    {
        public static CartDTO ToCartDto(this Cart cart)
        {
            return new CartDTO { Id = cart.Id, CartItems = cart.CartItems };
        }
    }
}
