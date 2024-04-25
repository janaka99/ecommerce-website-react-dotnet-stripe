using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ecommerceapp.helpers;
using ecommerceapp.Interfaces.Service;
using ecommerceapp.Service;
using Microsoft.Extensions.Options;

namespace ecommerceapp.Configurations;

public static class CloudinaryConfig
{
    public static void AddCloudinaryConfigurations(
        this IServiceCollection services,
        IConfiguration configuration
    )
    {
        services.Configure<CloudinarySettings>(configuration.GetSection("CLOUDINARY"));

        services.AddScoped<ICloudinaryService, CloudinaryService>(provider =>
        {
            var cloudinarySettings = provider
                .GetRequiredService<IOptions<CloudinarySettings>>()
                .Value;
            return new CloudinaryService(cloudinarySettings.CloudinaryUrl);
        });
    }
}
