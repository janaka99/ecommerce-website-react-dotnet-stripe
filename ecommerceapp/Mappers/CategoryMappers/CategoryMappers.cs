using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ecommerceapp.Models.Domain;
using ecommerceapp.Models.DTOs.CategoryDTO;

namespace ecommerceapp.Mappers.CategoryMappers
{
    public static class CategoryMappers
    {
        public static CategoryDTO ToCategoryDto(this Category category)
        {
            return new CategoryDTO
            {
                Id = category.Id,
                Name = category.Name,
                Description = category.Description
            };
        }

        public static Category ToCategoryFromCreate(this CreateCategoryDTO category)
        {
            return new Category { Name = category.Name, Description = category.Description };
        }

        public static Category ToCategoryFromUpdate(this UpdateCategoryDTO category)
        {
            return new Category { Name = category.Name, Description = category.Description };
        }
    }
}
