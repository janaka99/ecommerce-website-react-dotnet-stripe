using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ecommerceapp.Models.Domain;
using ecommerceapp.Models.DTOs.OrderDTOs;

namespace ecommerceapp.Mappers.OrderMappers
{
    public static class OrderMappers
    {
        public static OrderDTO ToOrderDto(this Order order)
        {
            return new OrderDTO
            {
                Id = order.Id,
                Created_at = order.Created_at,
                OrderItems = order.OrderItems,
                Status = order.status,
                UserId = order.UserId,
            };
        }
    }
}
