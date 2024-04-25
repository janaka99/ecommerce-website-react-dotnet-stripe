using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ecommerceapp.Models.Domain;
using ecommerceapp.Models.DTOs.ReviewDTO;

namespace ecommerceapp.Mappers.ReviewMappers
{
    public static class ReviewMappers
    {
        public static ReviewDto ToReviewDto(this Review review)
        {
            return new ReviewDto
            {
                Id = review.Id,
                Rating = review.Rating,
                Comment = review.Comment,
                UserId = review.UserId,
                ProductId = review.ProductId,
            };
        }
    }
}
