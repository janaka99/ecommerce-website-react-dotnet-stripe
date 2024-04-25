using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ecommerceapp.Models.DTOs.Product;

public record UpdateProductDTO
{
    public required string Title { get; set; }
    public required decimal Price { get; set; }
    public required string Picture { get; set; }
    public required string Description { get; set; }
    public int CategoryId { get; set; }
}
