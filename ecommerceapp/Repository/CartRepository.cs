using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ecommerceapp.Data;
using ecommerceapp.Interfaces;
using ecommerceapp.Models.Domain;
using ecommerceapp.Models.DTOs.Cart;
using ecommerceapp.Models.DTOs.CartDTOs;
using Microsoft.EntityFrameworkCore;

namespace ecommerceapp.Repository
{
    public class CartRepository : ICartRepository
    {
        private readonly EcommerceAppDbContext _dbContext;

        public CartRepository(EcommerceAppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public Task<CartItem> GetUserCart()
        {
            throw new NotImplementedException();
        }

        public async Task<Cart?> GetCartById(string userId)
        {
            var userCart = await _dbContext
                .Carts.Include(c => c.CartItems)
                .ThenInclude(ci => ci.Product)
                .Where(cart => cart.UserId == userId)
                .FirstOrDefaultAsync();

            if (userCart is null)
            {
                var newCart = new Cart { UserId = userId, CartItems = new List<CartItem>() };
                await _dbContext.Carts.AddAsync(newCart);
                await _dbContext.SaveChangesAsync();

                return newCart;
            }
            return userCart;
        }

        public async Task<Cart?> CartExits(int cartId, string userId)
        {
            var userCart = await _dbContext
                .Carts.Where(c => c.Id == cartId && c.UserId == userId)
                .FirstOrDefaultAsync();

            if (userCart is null)
            {
                return null;
            }
            return userCart;
        }

        public async Task<CartItem?> ProductExists(string userId, int productId)
        {
            var userCart = await _dbContext
                .Carts.Where(c => c.UserId == userId)
                .FirstOrDefaultAsync();
            if (userCart is null)
            {
                return null;
            }
            var product = await _dbContext
                .CartItems.Where(
                    cartItem => cartItem.ProductId == productId && cartItem.CartId == userCart.Id
                )
                .FirstOrDefaultAsync();

            if (product == null)
            {
                return null;
            }
            return product;
        }

        public async Task<Product?> ProductExists(AddToCartDTO cartModel)
        {
            //check if the product is available or not
            var product = await _dbContext.Products.FindAsync(cartModel.ProductId);
            if (product == null)
            {
                return null;
            }
            return product;
        }

        public async Task<CartItem?> AddToCart(Cart cart, AddToCartDTO cartModel)
        {
            try
            {
                var newCartItem = new CartItem
                {
                    ProductId = cartModel.ProductId,
                    CartId = cart.Id,
                };

                await _dbContext.CartItems.AddAsync(newCartItem);
                await _dbContext.SaveChangesAsync();

                return newCartItem;
            }
            catch (Exception ex)
            {
                Console.Write(ex);
                return null;
            }
        }

        public async Task<CartItem?> RemoveFromCart(int cartId, int productId)
        {
            var product = await _dbContext
                .CartItems.Where(
                    cartItem => cartItem.ProductId == productId && cartItem.CartId == cartId
                )
                .FirstOrDefaultAsync();

            if (product == null)
            {
                return null;
            }

            _dbContext.CartItems.Remove(product);
            await _dbContext.SaveChangesAsync();
            return product;
        }
    }
}
