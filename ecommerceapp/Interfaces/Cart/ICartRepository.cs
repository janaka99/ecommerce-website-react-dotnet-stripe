using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ecommerceapp.Models.Domain;
using ecommerceapp.Models.DTOs.Cart;
using ecommerceapp.Models.DTOs.CartDTOs;

namespace ecommerceapp.Interfaces
{
    public interface ICartRepository
    {
        Task<CartItem> GetUserCart();

        Task<Cart?> GetCartById(string userId);
        Task<CartItem?> ProductExists(string userId, int productId);
        Task<CartItem?> AddToCart(Cart cart, AddToCartDTO cartModel);
        Task<CartItem?> RemoveFromCart(int cartId, int productId);

        Task<Cart?> CartExits(int cartId, string userId);
    }
}
