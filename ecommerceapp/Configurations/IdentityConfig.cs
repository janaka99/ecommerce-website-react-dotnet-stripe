using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using ecommerceapp.Data;
using ecommerceapp.Models.Domain;
using Microsoft.AspNetCore.Identity;

namespace ecommerceapp.Configurations;

public static class IdentityConfig
{
    public static void AddIdentityConfiguration(this IServiceCollection services)
    {
        services
            .AddIdentity<User, IdentityRole>(options =>
            {
                options.Password.RequireDigit = true;
                options.Password.RequireLowercase = true;
                options.Password.RequireUppercase = true;
                options.Password.RequireNonAlphanumeric = true;
                options.Password.RequiredLength = 8;
                options.User.AllowedUserNameCharacters =
                    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+/ ";
            })
            .AddEntityFrameworkStores<EcommerceAppDbContext>()
            .AddDefaultTokenProviders();

        services.Configure<IdentityOptions>(
            options => options.ClaimsIdentity.UserIdClaimType = ClaimTypes.NameIdentifier
        );
    }
}
