using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using ecommerceapp.helpers;
using ecommerceapp.Interfaces.Service;
using Microsoft.Extensions.Options;

namespace ecommerceapp.Service
{
    public class CloudinaryService : ICloudinaryService
    {
        private readonly Cloudinary _cloudinary;

        public CloudinaryService(string cloudinaryUrl)
        {
            _cloudinary = new Cloudinary(cloudinaryUrl);
        }

        public async Task<ImageUploadResult?> AddPhotoAsync(IFormFile file)
        {
            var uploaded_result = new ImageUploadResult();

            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    // Do something with the file data, for example, save it to a storage system.
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.FileName, stream),
                        UseFilename = true,
                        UniqueFilename = true,
                        Overwrite = true
                    };

                    uploaded_result = await _cloudinary.UploadAsync(uploadParams);
                    // For demonstration, let's just return the file name and size.
                    return uploaded_result;
                }
            }
            return null;
        }

        public async Task<ImageUploadResult?> UpdatePhoto(IFormFile file)
        {
            var uploaded_result = new ImageUploadResult();

            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    // Do something with the file data, for example, save it to a storage system.
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.FileName, stream),
                        UseFilename = true,
                        UniqueFilename = true,
                        Overwrite = true,
                    };

                    uploaded_result = await _cloudinary.UploadAsync(uploadParams);

                    return uploaded_result;
                }
            }
            return null;
        }

        public async Task<DeletionResult?> DeletePhotoAsync(string? publicId)
        {
            try
            {
                var deletedParams = new DeletionParams(publicId);

                var result = await _cloudinary.DestroyAsync(deletedParams);

                return result;
            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}
