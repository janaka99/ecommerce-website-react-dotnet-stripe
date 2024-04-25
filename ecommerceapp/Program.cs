using ecommerceapp.Configurations;
using ecommerceapp.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

// Add Serivces to the container
builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddPolicy(
        name: MyAllowSpecificOrigins,
        policy =>
        {
            policy.WithOrigins("http://localhost:3000").AllowAnyMethod().AllowAnyHeader();
        }
    );
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<EcommerceAppDbContext>(
    options => options.UseSqlServer(builder.Configuration.GetConnectionString("DevDefault"))
);

//  Identity Configurations
builder.Services.AddIdentityConfiguration();

// Authentication Configurations
builder.Services.AddAuthenticationConfiguration(builder.Configuration);

// Cloudinary Configurations
builder.Services.AddCloudinaryConfigurations(builder.Configuration);

// Stripe Configurations
builder.Services.AddStripeConfiguration(builder.Configuration);

// Controllers Configurations
builder.Services.AddControllersConfiguration();

var app = builder.Build();

app.UseCors(MyAllowSpecificOrigins);

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

// app.UseRouting();

// app.UseAuthorization();

app.MapControllers();

// app.MapControllerRoute(name: "default", pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
