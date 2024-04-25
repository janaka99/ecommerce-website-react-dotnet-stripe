using CloudinaryDotNet.Actions;
using ecommerceapp.Models.Domain;
using ecommerceapp.Models.DTOs.Product;

namespace ecommerceapp.Interfaces
{
    public interface IProductRepository
    {
        Task<List<Product>> GetAllAsync();
        Task<List<Product>> GetFeaturedAsync();
        Task<Product?> GetById(int id);
        Task<Product?> CreateAsync(Product productModel);

        Task<Product?> UpdateAsync(UpdateProductRequestDTO productModel, ImageUploadResult rs);

        Task<Product?> DeleteAsync(int id);
    }
}
