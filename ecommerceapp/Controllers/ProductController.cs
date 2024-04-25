using CloudinaryDotNet.Actions;
using ecommerceapp.Data;
using ecommerceapp.Interfaces;
using ecommerceapp.Interfaces.Service;
using ecommerceapp.Mappers;
using ecommerceapp.Models.DTOs.Product;
using ecommerceapp.Repository;
using ecommerceapp.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ecommerceapp.Controllers
{
    [Route("/api/product")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductRepository _productRepo;
        private readonly ICloudinaryService _cldService;

        public ProductController(IProductRepository productRepo, ICloudinaryService cld)
        {
            _productRepo = productRepo;
            _cldService = cld;
        }

        // GET ALL PRODUCTS
        [HttpGet]
        [Route("")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var products = await _productRepo.GetAllAsync();
                if (products is null)
                {
                    return NoContent();
                }

                var ProductDtos = products.Select(p => p.ToProductDto());

                return Ok(products);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // GET A SINGLE ORDER
        [HttpGet]
        [Route("featured")]
        public async Task<IActionResult> GetFeaturedOrders()
        {
            try
            {
                var products = await _productRepo.GetFeaturedAsync();
                if (products is null)
                {
                    return NoContent();
                }
                var ProductDtos = products.Select(p => p.ToProductDto());
                return Ok(ProductDtos);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // GET A SINGLE ORDER
        [HttpGet]
        [Route("single/{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            try
            {
                var product = await _productRepo.GetById(id);
                if (product is null)
                {
                    return NoContent();
                }
                return Ok(product.ToProductDto());
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // ADD NEW PRODUCT
        [HttpPost]
        [Route("add-new")]
        public async Task<IActionResult> CreateNewProduct(
            [FromForm] CreateProductDTO details,
            IFormFile file
        )
        {
            try
            {
                Console.WriteLine("Req recieved");
                if (!ModelState.IsValid)
                {
                    return BadRequest("Validation failed");
                }

                if (file == null || file.Length <= 0)
                {
                    return BadRequest("very bad");
                }

                var rs = await _cldService.AddPhotoAsync(file);
                if (rs == null)
                {
                    return BadRequest("very bad");
                }
                if (rs.Error == null)
                {
                    var ProductToSave = details.ToProductFromCreateDto();

                    ProductToSave.Picture = rs.SecureUrl.ToString();
                    ProductToSave.PicturePublicId = rs.PublicId;
                    var result = await _productRepo.CreateAsync(ProductToSave);
                    if (result == null)
                    {
                        await _cldService.DeletePhotoAsync(rs.PublicId);
                        return BadRequest("very bad");
                    }
                    return Ok(result);
                }
                Console.WriteLine(value: rs.Error);
                return BadRequest("baaddd");
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return BadRequest("baaddd  22");
            }
        }

        // UPDATE A PRODUCT
        [HttpPut]
        [Route("update")]
        [Authorize]
        public async Task<IActionResult> Update(
            [FromForm] UpdateProductRequestDTO details,
            IFormFile? file
        )
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var product = await _productRepo.GetById(details.ProductId);

                if (product == null)
                {
                    return BadRequest("Product not found");
                }
                var existingImage = product.PicturePublicId;

                var rs = new ImageUploadResult();

                if (file != null && file.Length > 0)
                {
                    rs = await _cldService.UpdatePhoto(file);
                    if (rs == null)
                    {
                        return BadRequest();
                    }
                    if (rs.Error != null)
                    {
                        return BadRequest("Image update failed");
                    }
                }
                else
                {
                    rs.Error = new Error { Message = "Empty file", };
                }

                var updatedProduct = await _productRepo.UpdateAsync(details, rs);

                if (updatedProduct == null)
                {
                    await _cldService.DeletePhotoAsync(rs.PublicId);
                    return BadRequest("Product update failed");
                }
                await _cldService.DeletePhotoAsync(existingImage!);
                return CreatedAtAction(
                    nameof(GetById),
                    new { id = updatedProduct.Id },
                    updatedProduct.ToProductDto()
                );
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // DELETE A PRODUCT
        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var productModel = await _productRepo.DeleteAsync(id);
            if (productModel == null)
            {
                return NotFound();
            }
            await _cldService.DeletePhotoAsync(productModel.PicturePublicId!);

            return NoContent();
        }
    }
}
