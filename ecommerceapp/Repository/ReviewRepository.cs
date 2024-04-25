using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ecommerceapp.Data;
using ecommerceapp.Interfaces;
using ecommerceapp.Models.Domain;
using ecommerceapp.Models.Domain.Enums;
using ecommerceapp.Models.DTOs.ReviewDTO;
using Microsoft.EntityFrameworkCore;

namespace ecommerceapp.Repository
{
    public class ReviewRepository : IReviewRepository
    {
        private readonly EcommerceAppDbContext _dbContext;

        public ReviewRepository(EcommerceAppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<Review>?> GetAllReviews()
        {
            var reviews = await _dbContext.Reviews.ToListAsync();
            if (reviews == null)
            {
                return null;
            }
            return reviews;
        }

        // get Review by REVIEW ID
        public async Task<Review?> GetReviewByReviewId(int productId, string userId)
        {
            var orderItem = await _dbContext
                .OrdersItems.Where(
                    oi =>
                        oi.ProductId == productId
                        && oi.Order!.UserId == userId
                        && oi.Order.status == OrderStatus.Paid
                )
                .FirstAsync();
            if (orderItem == null)
            {
                return null;
            }

            return await _dbContext
                .Reviews.Where(r => r.ProductId == productId)
                .FirstOrDefaultAsync();
        }

        // CREATE NEW REVIEW

        public async Task<Review?> CreateNewReview(CreateReviewDTO review, string userId)
        {
            using var transaction = _dbContext.Database.BeginTransaction();
            try
            {
                // check if order is valid
                var order = await _dbContext
                    .Orders.Where(
                        order =>
                            order.Id == review.OrderId
                            && order.status == OrderStatus.Paid
                            && order.UserId == userId
                    )
                    .FirstOrDefaultAsync();
                if (order == null)
                {
                    return null;
                }

                // check if order item is bought or not
                var orderitem = await _dbContext
                    .OrdersItems.Where(
                        o => o.ProductId == review.ProductId && o.OrderId == review.OrderId
                    )
                    .FirstOrDefaultAsync();

                if (orderitem == null)
                {
                    return null;
                }

                // Chec if the review already exists
                var isReviewed = await _dbContext
                    .Reviews.Where(r => r.ProductId == review.ProductId && r.UserId == userId)
                    .FirstOrDefaultAsync();

                if (isReviewed != null)
                {
                    return null;
                }

                var newReview = new Review
                {
                    Rating = review.Rating,
                    Comment = review.Comment,
                    UserId = userId,
                    ProductId = review.ProductId,
                };
                ;
                await _dbContext.Reviews.AddAsync(newReview);
                await _dbContext.SaveChangesAsync();

                transaction.Commit();

                return newReview;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public async Task<Review?> ReviewExists(string userId, int reviewId, int orderItemId)
        {
            return await _dbContext
                .Reviews.Where(r => r.Id == orderItemId && r.UserId == userId)
                .FirstOrDefaultAsync();
        }

        // UPDATE REVIEW

        public async Task<Review?> UpdateReview(EditReviewDTO review, string userId)
        {
            using var transaction = _dbContext.Database.BeginTransaction();
            try
            {
                // check if there is a review
                var toUpdateReview = await _dbContext
                    .Reviews.Where(r => r.UserId == userId && r.Id == review.ReviewId)
                    .FirstOrDefaultAsync();

                if (toUpdateReview == null)
                {
                    return null;
                }

                toUpdateReview.Rating = review.Rating;
                toUpdateReview.Comment = review.Comment;

                await _dbContext.SaveChangesAsync();

                transaction.Commit();

                return toUpdateReview;
            }
            catch (Exception)
            {
                return null;
            }
        }

        // DELETE A REVIEW

        public async Task<Review?> DeleteReview(string userId, int reviewId)
        {
            try
            {
                var review = await _dbContext
                    .Reviews.Where(r => r.UserId == userId && r.Id == reviewId)
                    .FirstAsync();
                if (review == null)
                {
                    return null;
                }

                _dbContext.Reviews.Remove(review);

                await _dbContext.SaveChangesAsync();

                return review;
            }
            catch (Exception)
            {
                return null;
            }
        }

        // GET ALL REVIEWS BELOGS TO PRODUCT
        public async Task<List<Review>?> GetReviewsByProductId(int productId)
        {
            var reviews = await _dbContext
                .Reviews.Where(r => r.ProductId == productId)
                .ToListAsync();
            if (reviews == null)
            {
                return null;
            }
            return reviews;
        }

        public async Task<List<Review>?> GetAllReviewsByUser(string userId)
        {
            var reviews = await _dbContext
                .Reviews.Where(review => review.UserId == userId)
                .ToListAsync();
            if (reviews == null)
            {
                return null;
            }
            return reviews;
        }

        public async Task<Review?> GetReviewByOrderItemId(string userId, int orderId)
        {
            var review = await _dbContext
                .Reviews.Where(review => review.UserId == userId && review.Id == orderId)
                .FirstOrDefaultAsync();
            if (review == null)
            {
                return null;
            }
            return review;
        }
    }
}
