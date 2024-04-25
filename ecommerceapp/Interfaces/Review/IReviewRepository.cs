using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ecommerceapp.Models.Domain;
using ecommerceapp.Models.DTOs.ReviewDTO;

namespace ecommerceapp.Interfaces
{
    public interface IReviewRepository
    {
        // get Review by REVIEW ID
        Task<Review?> GetReviewByReviewId(int productId, string userId);

        // CREATE NEW REVIEW
        Task<Review?> CreateNewReview(CreateReviewDTO review, string userId);

        // CHEK IF REVIEW EXISTS
        Task<Review?> ReviewExists(string userId, int reviewId, int orderItemId);

        // UPDATE REVIEW
        Task<Review?> UpdateReview(EditReviewDTO review, string userId);

        // DELETE A REVIEW
        Task<Review?> DeleteReview(string userId, int reviewId);

        // GET ALL REVIEWS BELOGS TO PRODUCT
        Task<List<Review>?> GetReviewsByProductId(int productId);

        // GET ALL REVIEWS BY USER
        Task<List<Review>?> GetAllReviewsByUser(string userId);

        // GET REVIEW BELOGS TO ORDER ITEM
        Task<Review?> GetReviewByOrderItemId(string userId, int orderId);

        Task<List<Review>?> GetAllReviews();
    }
}
