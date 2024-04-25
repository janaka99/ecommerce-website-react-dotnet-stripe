using CloudinaryDotNet.Actions;
using ecommerceapp.Data;
using ecommerceapp.Interfaces;
using ecommerceapp.Interfaces.Service;
using ecommerceapp.Mappers;
using ecommerceapp.Models.Domain;
using ecommerceapp.Models.DTOs.Product;
using Microsoft.EntityFrameworkCore;

namespace ecommerceapp.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly EcommerceAppDbContext _dbContext;
        private readonly ICloudinaryService _cldService;

        public ProductRepository(EcommerceAppDbContext dbContext, ICloudinaryService cld)
        {
            _dbContext = dbContext;
            _cldService = cld;
        }

        public async Task<List<Product>> GetAllAsync()
        {
            return await _dbContext
                .Products.Include(p => p.Reviews)
                .Include(p => p.Category)
                .ToListAsync();
        }

        public async Task<List<Product>> GetFeaturedAsync()
        {
            return await _dbContext
                .Products.Include(p => p.Reviews)
                .Include(p => p.Category)
                .OrderByDescending(p => p.Reviews.Count)
                .Take(6)
                .ToListAsync();
        }

        public async Task<Product?> GetById(int id)
        {
            try
            {
                return await _dbContext
                    .Products.Include(p => p.Reviews)
                    .ThenInclude(r => r.User)
                    .Include(p => p.Category)
                    .FirstOrDefaultAsync(p => p.Id == id);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return null;
            }
        }

        public async Task<Product?> CreateAsync(Product productModel)
        {
            try
            {
                await _dbContext.Products.AddAsync(productModel);
                await _dbContext.SaveChangesAsync();

                return productModel;
            }
            catch (System.Exception)
            {
                return null;
            }
        }

        public async Task<Product?> DeleteAsync(int id)
        {
            var productModel = await _dbContext.Products.FindAsync(id);
            if (productModel == null)
            {
                return null;
            }

            _dbContext.Products.Remove(productModel);
            await _dbContext.SaveChangesAsync();
            return productModel;
        }

        public async Task<Product?> UpdateAsync(
            UpdateProductRequestDTO productModel,
            ImageUploadResult rs
        )
        {
            try
            {
                var existingProduct = await _dbContext.Products.FindAsync(productModel.ProductId);
                if (existingProduct == null)
                {
                    return null;
                }
                if (rs.Error == null)
                {
                    existingProduct.Picture = rs.SecureUrl.ToString();
                    existingProduct.PicturePublicId = rs.PublicId;
                }

                existingProduct.Title = productModel.Title;
                existingProduct.Price = productModel.Price;
                existingProduct.Description = productModel.Description;
                existingProduct.CategoryId = productModel.CategoryId;

                await _dbContext.SaveChangesAsync();

                return existingProduct;
            }
            catch (System.Exception)
            {
                return null;
            }
        }
    }
}
