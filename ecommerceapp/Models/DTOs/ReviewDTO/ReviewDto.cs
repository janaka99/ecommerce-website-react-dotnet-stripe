using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ecommerceapp.Models.Domain;

namespace ecommerceapp.Models.DTOs.ReviewDTO;

public class ReviewDto
{
    public int Id { get; set; }
    public required int Rating { get; set; }
    public required string Comment { get; set; }
    public required string UserId { get; set; }
    public int ProductId { get; set; }
    public int OrderItemId { get; set; }
    public DateTime Created_at { get; set; }
    public UserDTO? User { get; set; }
}
