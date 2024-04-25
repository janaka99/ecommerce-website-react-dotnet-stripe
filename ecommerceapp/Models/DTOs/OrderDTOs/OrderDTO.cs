using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ecommerceapp.Models.Domain;
using ecommerceapp.Models.Domain.Enums;

namespace ecommerceapp.Models.DTOs.OrderDTOs
{
    public class OrderDTO
    {
        public required int Id { get; set; }
        public ICollection<OrderItem>? OrderItems { get; set; }
        public required DateTime Created_at { get; set; }
        public required OrderStatus Status { get; set; }
        public required string UserId { get; set; }
    }
}
