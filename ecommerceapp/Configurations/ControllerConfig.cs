using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using ecommerceapp.Interfaces;
using ecommerceapp.Interfaces.Service;
using ecommerceapp.Repository;
using ecommerceapp.Service;

namespace ecommerceapp.Configurations;

public static class ControllerConfig
{
    public static void AddControllersConfiguration(this IServiceCollection services)
    {
        services
            .AddControllers()
            .AddJsonOptions(
                x => x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles
            );

        services.AddScoped<IProductRepository, ProductRepository>();
        services.AddScoped<IOrderRepository, OrderRepository>();
        services.AddScoped<IReviewRepository, ReviewRepository>();
        services.AddScoped<ICartRepository, CartRepository>();
        services.AddScoped<ICategoryRepository, CategoryRepository>();
        services.AddScoped<ITokenService, AuthTokenService>();
    }
}
