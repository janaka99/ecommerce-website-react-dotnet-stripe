using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CloudinaryDotNet.Actions;
using ecommerceapp.Models.Domain;

namespace ecommerceapp.Interfaces.Service
{
    public interface ICloudinaryService
    {
        Task<ImageUploadResult?> AddPhotoAsync(IFormFile file);
        Task<DeletionResult?> DeletePhotoAsync(string publicId);
        Task<ImageUploadResult?> UpdatePhoto(IFormFile file);
    }
}
