using System.Security.Claims;
using ecommerceapp.helpers;
using ecommerceapp.Interfaces;
using ecommerceapp.Mappers.OrderMappers;
using ecommerceapp.Models.DTOs.OrderDTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.ObjectPool;
using Microsoft.Extensions.Options;
using Stripe;
using Stripe.Checkout;

namespace ecommerceapp.Controllers
{
    [Route("/api/order")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderRepository _orderRepo;
        private readonly ICartRepository _cartRepo;
        private readonly string WEBHOOK_SECRET;

        public OrderController(
            IOrderRepository orderRepo,
            ICartRepository cartRepo,
            IOptions<StripeSettings> stripeSettings
        )
        {
            _orderRepo = orderRepo;
            _cartRepo = cartRepo;
            WEBHOOK_SECRET = stripeSettings.Value.WebhookSecretKey;
        }

        // GET ALL ORDERS
        [HttpGet]
        [Route("")]
        [Authorize]
        public async Task<IActionResult> GetOrdersByUser()
        {
            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (userId == null)
                {
                    return BadRequest();
                }
                var orders = await _orderRepo.GetOrders(userId);
                if (orders == null)
                {
                    return NoContent();
                }

                // var orderDtos = orders.Select(order => order.ToOrderDto());

                return Ok(orders);
            }
            catch (System.Exception)
            {
                return NoContent();
            }
        }

        // GET ALL ORDERS
        [HttpGet]
        [Route("all")]
        // [Authorize]
        public async Task<IActionResult> GetOrders()
        {
            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                var role = User.FindFirstValue(ClaimTypes.Role);
                if (userId == null || role != "Admin")
                {
                    return BadRequest();
                }

                var orders = await _orderRepo.GetAllOrders();
                if (orders == null)
                {
                    return NoContent();
                }

                // var orderDtos = orders.Select(order => order.ToOrderDto());

                return Ok(orders);
            }
            catch (System.Exception)
            {
                return NoContent();
            }
        }

        // GET A SINGLE ORDER
        [HttpGet]
        [Route("single/{id}")]
        [Authorize]
        public async Task<IActionResult> GetOrderById([FromRoute] int id)
        {
            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (userId == null)
                {
                    return BadRequest();
                }

                var order = await _orderRepo.GetById(id, userId);
                if (order == null)
                {
                    return NoContent();
                }
                return Ok(order);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // ADD NEW ORDER
        [HttpPost]
        [Route("single/add-new-order")]
        [Authorize]
        public async Task<IActionResult> AddNewOrder([FromBody] CreateOrderDTO order)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest();
                }
                // Get the current user's ID
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (userId == null)
                {
                    return BadRequest();
                }
                var cart = await _cartRepo.CartExits(order.CartId, userId);
                if (cart == null)
                {
                    return BadRequest();
                }
                var newOrder = await _orderRepo.CreateOrder(cart.Id, userId);
                if (newOrder == null)
                {
                    return BadRequest();
                }
                if (newOrder.OrderItems == null)
                {
                    return BadRequest();
                }

                // Creating checkout session using stripe

                var domain = "http://localhost:3000/";

                var options = new SessionCreateOptions
                {
                    SuccessUrl = domain + $"page/confirm-order",
                    CancelUrl = domain + $"page/order-cancel",
                    LineItems = new List<SessionLineItemOptions>(),
                    Mode = "payment",
                    Metadata = new Dictionary<string, string>()
                };
                Console.WriteLine("work fore 1");

                foreach (var item in newOrder.OrderItems)
                {
                    var sessionListitem = new SessionLineItemOptions
                    {
                        PriceData = new SessionLineItemPriceDataOptions
                        {
                            UnitAmount = (long)item.Price,
                            Currency = "usd",
                            ProductData = new SessionLineItemPriceDataProductDataOptions
                            {
                                Name = item.Product!.Title,
                                Images = new List<string> { item.Product.Picture! }
                            },
                        },
                        Quantity = 1,
                    };
                    Console.WriteLine("work fore 2");

                    options.LineItems.Add(sessionListitem);
                }
                Console.WriteLine("work fore 3");
                options.Metadata.Add("order_id", newOrder.Id.ToString());
                options.Metadata.Add("cart_id", order.CartId.ToString());
                Console.WriteLine("work fore 4");
                var service = new SessionService();
                Session session = service.Create(options);
                Console.WriteLine("work fore 4");
                // Add the session ID to the response headers
                // Response.Headers.Append("Stripe-Session-Id", session.Url);
                var url = new { stUrl = session.Url };
                return Ok(url);
            }
            catch (Exception ex)
            {
                System.Console.WriteLine(ex);
                return BadRequest();
            }
        }

        // Confirm Order
        [HttpPost]
        [Route("single/handle-payment")]
        public async Task<IActionResult> ConfirmOrder()
        {
            var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
            try
            {
                var stripeEvent = EventUtility.ConstructEvent(
                    json,
                    Request.Headers["Stripe-Signature"],
                    WEBHOOK_SECRET
                );

                if (stripeEvent.Type == Events.CheckoutSessionCompleted)
                {
                    var pi = stripeEvent.Data.Object as Session;
                    if (pi == null)
                    {
                        return BadRequest();
                    }
                    var metadata = pi.Metadata;

                    int order_id =
                        metadata.ContainsKey("order_id")
                        && int.TryParse(metadata["order_id"], out var parsedOrderId)
                            ? parsedOrderId
                            : -1;
                    int cart_id =
                        metadata.ContainsKey("cart_id")
                        && int.TryParse(metadata["cart_id"], out var parsedCartId)
                            ? parsedCartId
                            : -1;

                    if (order_id == -1 || cart_id == -1)
                    {
                        return BadRequest();
                    }

                    if (pi.PaymentStatus == "paid")
                    {
                        var updatedOrder = await _orderRepo.ConfirmOrder(order_id, cart_id);
                        return Ok(updatedOrder);
                    }
                    else
                    {
                        await _orderRepo.CancelOrder(order_id);
                        return BadRequest();
                    }
                }
                else
                {
                    return Ok();
                }
            }
            catch (StripeException)
            {
                return BadRequest();
            }
        }
    }
}
