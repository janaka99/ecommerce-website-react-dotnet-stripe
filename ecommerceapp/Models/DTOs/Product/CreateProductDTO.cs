using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace ecommerceapp.Models.DTOs.Product;

public class CreateProductDTO
{
    [Required]
    public required string Title { get; set; }

    [Required]
    public required decimal Price { get; set; }

    [Required]
    public required string Description { get; set; }

    [Required]
    public int CategoryId { get; set; }
}
