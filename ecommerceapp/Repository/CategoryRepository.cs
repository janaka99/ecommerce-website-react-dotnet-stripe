using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ecommerceapp.Data;
using ecommerceapp.Interfaces;
using ecommerceapp.Models.Domain;
using ecommerceapp.Models.DTOs.CategoryDTO;
using Microsoft.EntityFrameworkCore;

namespace ecommerceapp.Repository
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly EcommerceAppDbContext _dbContext;

        public CategoryRepository(EcommerceAppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<Category>?> GetAllAsync()
        {
            return await _dbContext.Categories.ToListAsync();
        }

        public async Task<Category?> GetById(int id)
        {
            return await _dbContext.Categories.FindAsync(id);
        }

        public async Task<Category> CreateAsync(Category categoryModel)
        {
            await _dbContext.Categories.AddAsync(categoryModel);
            await _dbContext.SaveChangesAsync();

            return categoryModel;
        }

        public async Task<Category?> DeleteAsync(int id)
        {
            var categoryModel = await _dbContext.Categories.FindAsync(id);
            if (categoryModel == null)
            {
                Console.WriteLine("not found category");
                return null;
            }
            Console.WriteLine("category: " + categoryModel);
            _dbContext.Categories.Remove(categoryModel);
            await _dbContext.SaveChangesAsync();
            return categoryModel;
        }

        public async Task<Category?> UpdateAsync(UpdateCategoryDTO categoryModel)
        {
            var existingCategory = await _dbContext.Categories.FindAsync(categoryModel.Id);
            if (existingCategory == null)
            {
                return null;
            }

            existingCategory.Name = categoryModel.Name;
            existingCategory.Description = categoryModel.Description;

            await _dbContext.SaveChangesAsync();

            return existingCategory;
        }
    }
}
