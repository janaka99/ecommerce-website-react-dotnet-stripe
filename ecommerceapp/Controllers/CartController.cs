using System.Security.Claims;
using ecommerceapp.Interfaces;
using ecommerceapp.Mappers.CartMappers;
using ecommerceapp.Models.DTOs.CartDTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ecommerceapp.Controllers
{
    [Route("/api/cart")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ICartRepository _cartRepo;

        public CartController(ICartRepository cartRepo)
        {
            _cartRepo = cartRepo;
        }

        [HttpGet]
        [Route("")]
        [Authorize]
        public async Task<IActionResult> GetCart()
        {
            try
            {
                // Get the current user's ID
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (userId == null)
                {
                    return BadRequest();
                }
                var cart = await _cartRepo.GetCartById(userId);
                if (cart == null)
                {
                    return BadRequest();
                }
                return Ok(cart.ToCartDto());
                // return Ok(userId);
            }
            catch (System.Exception)
            {
                return NoContent();
            }
        }

        [HttpPost]
        [Route("add-to-cart")]
        [Authorize]
        public async Task<IActionResult> AddToCart([FromBody] AddToCartDTO cartItemModel)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                // Get the current user's ID
                var UserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (UserId == null)
                {
                    return BadRequest();
                }
                //Chekc if the product is valid
                var productToAddCart = await _cartRepo.ProductExists(
                    UserId,
                    cartItemModel.ProductId
                );
                if (productToAddCart != null)
                {
                    return Ok();
                }
                //Get the User cart
                var userCart = await _cartRepo.GetCartById(UserId);
                if (userCart == null)
                {
                    return BadRequest();
                }
                // Add item to cart
                var updatedCart = await _cartRepo.AddToCart(userCart, cartItemModel);

                if (updatedCart == null)
                {
                    return BadRequest();
                }

                return CreatedAtAction(nameof(GetCart), null, userCart.ToCartDto());
            }
            catch (System.Exception)
            {
                return BadRequest();
            }
        }

        // DELETE FROM CART
        [HttpDelete]
        [Route("remove-from-cart/{cartId}/{productId}")]
        [Authorize]
        public async Task<IActionResult> DeleteFromCart(
            [FromRoute] int cartId,
            [FromRoute] int productId
        )
        {
            try
            {
                // Get the current user's ID
                var UserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (UserId == null)
                {
                    return BadRequest();
                }
                //Get the User cart
                var userCart = await _cartRepo.CartExits(cartId, UserId);
                if (userCart == null)
                {
                    return BadRequest();
                }
                //Check if product Exists
                var cartItem = await _cartRepo.ProductExists(UserId, productId);
                if (cartItem == null)
                {
                    return BadRequest();
                }
                // remove item from cart
                var updatedCart = await _cartRepo.RemoveFromCart(userCart.Id, cartItem.ProductId);

                return Accepted();
            }
            catch (System.Exception)
            {
                return BadRequest();
            }
        }
    }
}
