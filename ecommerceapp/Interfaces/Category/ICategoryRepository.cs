using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ecommerceapp.Models.Domain;
using ecommerceapp.Models.DTOs.CategoryDTO;

namespace ecommerceapp.Interfaces
{
    public interface ICategoryRepository
    {
        Task<List<Category>?> GetAllAsync();
        Task<Category?> GetById(int id);
        Task<Category> CreateAsync(Category categoryModel);

        Task<Category?> UpdateAsync(UpdateCategoryDTO categoryModel);

        Task<Category?> DeleteAsync(int id);
    }
}
