using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ecommerceapp.Models.Domain;
using ecommerceapp.Models.DTOs;
using ecommerceapp.Models.DTOs.Product;
using ecommerceapp.Models.DTOs.ReviewDTO;

namespace ecommerceapp.Mappers
{
    public static class ProductMappers
    {
        public static ProductDTO ToProductDto(this Product product)
        {
            return new ProductDTO
            {
                Id = product.Id,
                Title = product.Title,
                Price = product.Price,
                Picture = product.Picture!,
                Description = product.Description,
                Created_at = product.Created_at,
                Updated_at = product.Updated_at,
                CategoryId = product.CategoryId,
                Category = product.Category,
                Reviews = product
                    .Reviews?.Select(
                        r =>
                            new ReviewDto
                            {
                                Id = r.Id,
                                Rating = r.Rating,
                                Comment = r.Comment,
                                UserId = r.UserId,
                                ProductId = r.ProductId,
                                User = r.User?.ToUserDto(),
                                Created_at = r.Created_at
                            }
                    )
                    .ToList()
            };
        }

        public static Product ToProductFromCreateDto(this CreateProductDTO newProduct)
        {
            return new Product
            {
                Title = newProduct.Title,
                Price = newProduct.Price,
                Description = newProduct.Description,
                CategoryId = newProduct.CategoryId,
            };
        }
    }
}
