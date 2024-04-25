using ecommerceapp.Interfaces;
using ecommerceapp.Mappers.CategoryMappers;
using ecommerceapp.Models.DTOs.CategoryDTO;
using ecommerceapp.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ecommerceapp.Controllers
{
    [Route("/api/category")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepo;

        public CategoryController(ICategoryRepository categoryRepo)
        {
            _categoryRepo = categoryRepo;
        }

        // GET ALL CATEGORIES
        [HttpGet]
        [Route("")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var categories = await _categoryRepo.GetAllAsync();
                if (categories is null)
                {
                    return NoContent();
                }
                var categoriesDtos = categories.Select(c => c.ToCategoryDto());
                return Ok(categoriesDtos);
            }
            catch (Exception)
            {
                return NoContent();
            }
        }

        // ADD NEW CATEGORY
        [HttpPost]
        [Route("add-new")]
        [Authorize]
        public async Task<IActionResult> Create([FromBody] CreateCategoryDTO category)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var categoryModel = category.ToCategoryFromCreate();
                var newCategory = await _categoryRepo.CreateAsync(categoryModel);

                return CreatedAtAction(
                    nameof(GetById),
                    new { id = newCategory.Id },
                    newCategory.ToCategoryDto()
                );
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // UPDATE SINGLE CATEGORY
        [HttpPut]
        [Route("update")]
        [Authorize]
        public async Task<IActionResult> Update([FromBody] UpdateCategoryDTO updateDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var categoryModel = await _categoryRepo.UpdateAsync(updateDto);
                if (categoryModel is null)
                {
                    return NoContent();
                }
                return CreatedAtAction(
                    nameof(GetById),
                    new { id = categoryModel.Id },
                    categoryModel.ToCategoryDto()
                );
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        // GET SINGLE CAtegory
        [HttpGet]
        [Route("single/{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            try
            {
                var category = await _categoryRepo.GetById(id);
                if (category is null)
                {
                    return NoContent();
                }
                return Ok(category.ToCategoryDto());
            }
            catch (Exception)
            {
                return NoContent();
            }
        }

        // DELETE A CATEGORY
        [HttpDelete]
        [Route("single/{id:int}")]
        [Authorize]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            try
            {
                Console.WriteLine(id);
                var productModel = await _categoryRepo.DeleteAsync(id);
                if (productModel == null)
                {
                    return NotFound();
                }

                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
