using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ecommerceapp.Models.Domain;

namespace ecommerceapp.Interfaces
{
    public interface IOrderRepository
    {
        Task<List<OrderItem>> GetOrders(string id);
        Task<object?> GetById(int id, string userId);
        Task<Order?> CreateOrder(int cartId, string userId);
        Task<Order?> ConfirmOrder(int order_id, int cart_id);
        Task<Order?> CancelOrder(int order_id);
        Task<object> GetAllOrders();
        // Task<OrderItem> CreateAsync(int id, OrderItem orderModel);
    }
}
