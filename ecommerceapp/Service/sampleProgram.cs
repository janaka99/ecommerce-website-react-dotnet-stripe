// using System.Security.Claims;
// using System.Text.Json.Serialization;
// using ecommerceapp.Data;
// using ecommerceapp.helpers;
// using ecommerceapp.Interfaces;
// using ecommerceapp.Interfaces.Service;
// using ecommerceapp.Models.Domain;
// using ecommerceapp.Repository;
// using ecommerceapp.Service;
// using Microsoft.AspNetCore.Authentication.JwtBearer;
// using Microsoft.AspNetCore.Identity;
// using Microsoft.EntityFrameworkCore;
// using Microsoft.Extensions.DependencyInjection;
// using Microsoft.Extensions.Options;
// using Microsoft.IdentityModel.Tokens;
// using Stripe;

// var builder = WebApplication.CreateBuilder(args);

// var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

// //Add services to the container
// builder.Services.AddControllers();

// builder.Services.AddCors(options =>
// {
//     options.AddPolicy(
//         name: MyAllowSpecificOrigins,
//         policy =>
//         {
//             policy.WithOrigins("http://localhost:3000").AllowAnyMethod().AllowAnyHeader();
//         }
//     );
// });

// // Add services to the container.
// // builder.Services.AddControllersWithViews();
// builder.Services.AddEndpointsApiExplorer();
// builder.Services.AddSwaggerGen();

// builder.Services.AddDbContext<EcommerceAppDbContext>(
//     options => options.UseSqlServer(builder.Configuration.GetConnectionString("DevDefault"))
// );

// builder
//     .Services.AddIdentity<User, IdentityRole>(options =>
//     {
//         options.Password.RequireDigit = true;
//         options.Password.RequireLowercase = true;
//         options.Password.RequireUppercase = true;
//         options.Password.RequireNonAlphanumeric = true;
//         options.Password.RequiredLength = 8;
//         options.User.AllowedUserNameCharacters =
//             "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+/ ";
//     })
//     .AddEntityFrameworkStores<EcommerceAppDbContext>()
//     .AddDefaultTokenProviders();

// builder
//     .Services.AddAuthentication(options =>
//     {
//         options.DefaultAuthenticateScheme =
//             options.DefaultChallengeScheme =
//             options.DefaultForbidScheme =
//             options.DefaultScheme =
//             options.DefaultSignInScheme =
//             options.DefaultSignOutScheme =
//                 JwtBearerDefaults.AuthenticationScheme;
//     })
//     .AddJwtBearer(options =>
//     {
//         options.TokenValidationParameters = new TokenValidationParameters
//         {
//             ValidateIssuer = true,
//             ValidIssuer = builder.Configuration["JWT:Issuer"],
//             ValidateAudience = true,
//             ValidAudience = builder.Configuration["JWT:Audience"],
//             ValidateIssuerSigningKey = true,
//             IssuerSigningKey = new SymmetricSecurityKey(
//                 System.Text.Encoding.UTF8.GetBytes(builder.Configuration["JWT:SigningKey"]!)
//             ),
//         };
//     });
// builder.Services.Configure<IdentityOptions>(
//     options => options.ClaimsIdentity.UserIdClaimType = ClaimTypes.NameIdentifier
// );

// builder
//     .Services.AddControllers()
//     .AddJsonOptions(x => x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

// builder.Services.Configure<CloudinarySettings>(builder.Configuration.GetSection("CLOUDINARY"));

// builder.Services.AddScoped<ICloudinaryService, CloudinaryService>(provider =>
// {
//     var cloudinarySettings = provider.GetRequiredService<IOptions<CloudinarySettings>>().Value;
//     return new CloudinaryService(cloudinarySettings.CloudinaryUrl);
// });
// builder.Services.AddScoped<IProductRepository, ProductRepository>();
// builder.Services.AddScoped<IOrderRepository, OrderRepository>();
// builder.Services.AddScoped<IReviewRepository, ReviewRepository>();
// builder.Services.AddScoped<ICartRepository, CartRepository>();
// builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
// builder.Services.AddScoped<ITokenService, AuthTokenService>();

// StripeConfiguration.ApiKey = builder.Configuration.GetSection("STRIPE:SecretKey").Get<string>();
// builder.Services.Configure<StripeSettings>(builder.Configuration.GetSection("STRIPE"));
// var app = builder.Build();

// app.UseCors(MyAllowSpecificOrigins);

// // Configure the HTTP request pipeline.
// if (!app.Environment.IsDevelopment())
// {
//     app.UseExceptionHandler("/Home/Error");
//     // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
//     app.UseHsts();
// }

// // Configure the HTTP request pipeline.
// if (app.Environment.IsDevelopment())
// {
//     app.UseSwagger();
//     app.UseSwaggerUI();
// }

// app.UseHttpsRedirection();

// app.UseAuthentication();

// app.UseAuthorization();

// // app.UseRouting();

// // app.UseAuthorization();

// app.MapControllers();

// // app.MapControllerRoute(name: "default", pattern: "{controller=Home}/{action=Index}/{id?}");

// app.Run();
