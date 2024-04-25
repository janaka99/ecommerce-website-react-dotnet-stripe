using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net.NetworkInformation;
using System.Threading.Tasks;
using ecommerceapp.Data;
using ecommerceapp.Interfaces;
using ecommerceapp.Models.Domain;
using ecommerceapp.Models.Domain.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Validations;

namespace ecommerceapp.Repository
{
    public class OrderRepository : IOrderRepository
    {
        private readonly EcommerceAppDbContext _dbContext;

        public OrderRepository(EcommerceAppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<OrderItem>> GetOrders(string userId)
        {
            var orders = await _dbContext
                .Orders.Include(o => o.OrderItems)
                .ThenInclude(oi => oi.Product)
                .Where(o => o.UserId == userId)
                .ToListAsync();
            var orderItems = new List<OrderItem>();

            foreach (var order in orders)
            {
                foreach (var orderItem in order.OrderItems)
                {
                    orderItems.Add(orderItem);
                }
            }
            return orderItems;
            // return await _dbContext.Orders.ToListAsync();
        }

        public async Task<object> GetAllOrders()
        {
            var orders = await _dbContext
                .OrdersItems.Include(oi => oi.Product)
                .Include(oi => oi.Order)
                .ThenInclude(o => o!.User)
                .Select(
                    oi =>
                        new
                        {
                            OrderId = oi.Order!.Id,
                            Price = oi.Price,
                            ProductName = oi.Product!.Title,
                            ProductPicture = oi.Product.Picture,
                            UserId = oi.Order.User!.Id,
                            UserName = oi.Order.User.UserName,
                            Email = oi.Order.User.Email,
                            OrderDate = oi.Order.Created_at,
                            PaymentStatus = oi.Order.status
                        }
                )
                .ToListAsync();

            return orders;
            // return await _dbContext.Orders.ToListAsync();
        }

        public async Task<object?> GetById(int id, string userId)
        {
            var order = await _dbContext
                .OrdersItems.Include(o => o.Order)
                .Include(o => o.Product)
                .Where(oi => oi.Order!.UserId == userId && oi.Id == id)
                .FirstOrDefaultAsync();
            if (order == null)
            {
                return null;
            }
            // Check if the user submitted the review
            var review = await _dbContext
                .Reviews.Include(r => r.User)
                .Where(r => r.UserId == userId && r.ProductId == order.ProductId)
                .FirstOrDefaultAsync();

            return new { Order = order, Review = review };
        }

        public async Task<Order?> CreateOrder(int cartId, string userId)
        {
            using var transaction = await _dbContext.Database.BeginTransactionAsync();
            try
            {
                // Get Item List From Cart
                var cartItems = await _dbContext
                    .CartItems.Where(item => item.CartId == cartId)
                    .ToListAsync();

                if (cartItems == null || cartItems.Count == 0)
                {
                    await transaction.RollbackAsync();
                    return null;
                }
                var order = new Order { UserId = userId, OrderItems = new List<OrderItem>() };
                // Add the new order to the context
                await _dbContext.Orders.AddAsync(order);
                await _dbContext.SaveChangesAsync();

                int orderId = order.Id;

                foreach (var item in cartItems)
                {
                    var product = await _dbContext.Products.FindAsync(item.ProductId);
                    if (product != null)
                    {
                        var orderItem = new OrderItem
                        {
                            Price = product.Price,
                            ProductId = product.Id,
                            OrderId = orderId
                        };
                        await _dbContext.OrdersItems.AddAsync(orderItem);
                    }
                }

                await _dbContext.SaveChangesAsync();

                var newOrder = await _dbContext
                    .Orders.Include(o => o.OrderItems)
                    .ThenInclude(oi => oi.Product)
                    .Where(o => o.Id == orderId)
                    .FirstOrDefaultAsync();

                await transaction.CommitAsync();

                return newOrder;
            }
            catch (Exception)
            {
                await transaction.RollbackAsync();
                return null;
            }
        }

        public async Task<Order?> ConfirmOrder(int order_id, int cart_id)
        {
            try
            {
                var order = await _dbContext
                    .Orders.Include(o => o.OrderItems)
                    .ThenInclude(oi => oi.Product)
                    .Where(o => o.Id == order_id)
                    .FirstOrDefaultAsync();
                if (order == null)
                {
                    return null;
                }
                order.status = OrderStatus.Paid;

                await _dbContext.SaveChangesAsync();

                foreach (var oi in order.OrderItems)
                {
                    var product = await _dbContext.Products.FindAsync(oi.ProductId);
                    if (product != null)
                    {
                        product.Sold = product.Sold + 1;
                        await _dbContext.SaveChangesAsync();
                    }
                }
                // Delete Cart by Id
                var cartToDelete = await _dbContext.Carts.FindAsync(cart_id);
                if (cartToDelete != null)
                {
                    _dbContext.Carts.Remove(cartToDelete);
                    await _dbContext.SaveChangesAsync();
                }

                return order;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public async Task<Order?> CancelOrder(int order_id)
        {
            try
            {
                var order = await _dbContext.Orders.FindAsync(order_id);
                if (order == null)
                {
                    return null;
                }

                _dbContext.Orders.Remove(order);
                await _dbContext.SaveChangesAsync();
                return order;
            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}
