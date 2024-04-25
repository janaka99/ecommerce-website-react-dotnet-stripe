using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using ecommerceapp.Interfaces;
using ecommerceapp.Mappers.ReviewMappers;
using ecommerceapp.Models.DTOs.ReviewDTO;
using ecommerceapp.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ecommerceapp.Controllers
{
    [Route("/api/review")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
        private readonly IReviewRepository _reviewRepo;

        public ReviewController(IReviewRepository reviewRepo)
        {
            _reviewRepo = reviewRepo;
        }

        // Create a single review
        [HttpPost]
        [Route("")]
        [Authorize]
        public async Task<IActionResult> CreateReview([FromBody] CreateReviewDTO review)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return BadRequest();
            }
            var newReview = await _reviewRepo.CreateNewReview(review, userId);

            if (newReview == null)
            {
                return NoContent();
            }
            return Ok(newReview.ToReviewDto());
        }

        // Edit a single review
        [HttpPut]
        [Route("")]
        [Authorize]
        public async Task<IActionResult> EditReview([FromBody] EditReviewDTO review)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return BadRequest();
            }
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var UpdatedReview = await _reviewRepo.UpdateReview(review, userId);
            if (UpdatedReview == null)
            {
                return NoContent();
            }
            return Ok(UpdatedReview.ToReviewDto());
        }

        //get reviews by user
        [HttpGet]
        [Route("user")]
        [Authorize]
        public async Task<IActionResult> GetAllReviewsByUser()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return BadRequest();
            }
            var reviews = await _reviewRepo.GetAllReviewsByUser(userId);

            if (reviews == null)
            {
                return NoContent();
            }
            var reviewDtos = reviews.Select(r => r.ToReviewDto());
            return Ok(reviewDtos);
        }

        //get reviews by user
        [HttpGet]
        [Route("all")]
        public async Task<IActionResult> GetAllReviews()
        {
            var reviews = await _reviewRepo.GetAllReviews();

            if (reviews == null)
            {
                return NoContent();
            }
            var reviewDtos = reviews.Select(r => r.ToReviewDto());
            return Ok(reviewDtos);
        }

        // Get a single review by review id
        [HttpGet]
        [Route("get/{productId}")]
        [Authorize]
        public async Task<IActionResult> GetByReviewId([FromRoute] int productId)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return BadRequest();
            }
            var review = await _reviewRepo.GetReviewByReviewId(productId, userId);
            if (review == null)
            {
                return NoContent();
            }
            return Ok(review.ToReviewDto());
        }

        // Delete a single review
        [HttpDelete]
        [Route("single/{reviewId}")]
        [Authorize]
        public async Task<IActionResult> DeleteReview([FromRoute] int reviewId)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return BadRequest();
            }

            var review = await _reviewRepo.DeleteReview(userId, reviewId);
            if (review == null)
            {
                return BadRequest();
            }
            return Ok(review.ToReviewDto());
        }

        // get all reviews by Product id
        [HttpGet]
        [Route("product/{id}")]
        public async Task<IActionResult> GetAllReviewsByProductId([FromRoute] int productId)
        {
            var reviews = await _reviewRepo.GetReviewsByProductId(productId);

            if (reviews == null)
            {
                return NoContent();
            }

            var reviewDtos = reviews.Select(r => r.ToReviewDto());
            return Ok(reviewDtos);
        }

        // Get review by order item
        // [HttpGet]
        // [Route("/order/{id}")]
        // public async Task<IActionResult> GetReviewByOrderItem([FromRoute] int orderId)
        // {
        //     var userId = "userId";
        //     var review = await _reviewRepo.GetReviewByOrderItemId(userId, orderId);

        //     if (review == null)
        //     {
        //         return NoContent();
        //     }

        //     return Ok(review.ToReviewDto());
        // }
    }
}
