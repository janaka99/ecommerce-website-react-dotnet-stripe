using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ecommerceapp.Models.Domain;
using ecommerceapp.Models.DTOs.ReviewDTO;

namespace ecommerceapp.Models.DTOs.Product;

public class ProductDTO
{
    public int Id { get; set; }
    public required string Title { get; set; }
    public required decimal Price { get; set; }
    public required string Picture { get; set; }
    public required string Description { get; set; }
    public DateTime Created_at { get; set; }
    public DateTime Updated_at { get; set; }
    public int CategoryId { get; set; }
    public Category? Category { get; set; }
    public ICollection<ReviewDto>? Reviews { get; set; }
}
