using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ecommerceapp.helpers;
using Stripe;

namespace ecommerceapp.Configurations;

public static class StripeConfig
{
    public static void AddStripeConfiguration(
        this IServiceCollection services,
        IConfiguration configuration
    )
    {
        StripeConfiguration.ApiKey = configuration.GetSection("STRIPE:SecretKey").Get<string>();
        services.Configure<StripeSettings>(configuration.GetSection("STRIPE"));
    }
}
