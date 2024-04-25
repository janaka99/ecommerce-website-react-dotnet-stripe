using System.Reflection;
using ecommerceapp.Models.Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ecommerceapp.Data;

public class EcommerceAppDbContext : IdentityDbContext<User>
{
    public EcommerceAppDbContext(DbContextOptions dbContextOptions)
        : base(dbContextOptions) { }

    public DbSet<Product> Products { get; set; }

    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderItem> OrdersItems { get; set; }
    public DbSet<Cart> Carts { get; set; }
    public DbSet<CartItem> CartItems { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Review> Reviews { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        List<IdentityRole> roles = new List<IdentityRole>
        {
            new IdentityRole { Name = "Admin", NormalizedName = "ADMIN" },
            new IdentityRole { Name = "Employee", NormalizedName = "EMPLOYEE" },
            new IdentityRole { Name = "User", NormalizedName = "USER" }
        };
        modelBuilder.Entity<IdentityRole>().HasData(roles);
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

        modelBuilder
            .Entity<User>()
            .HasMany(e => e.Carts)
            .WithOne(e => e.User)
            .HasForeignKey(e => e.UserId)
            .HasPrincipalKey(e => e.Id);

        modelBuilder
            .Entity<User>()
            .HasMany(e => e.Orders)
            .WithOne(e => e.User)
            .HasForeignKey(e => e.UserId)
            .HasPrincipalKey(e => e.Id);

        modelBuilder
            .Entity<Order>()
            .HasMany(e => e.OrderItems)
            .WithOne(e => e.Order)
            .HasForeignKey(e => e.OrderId)
            .HasPrincipalKey(e => e.Id);

        modelBuilder
            .Entity<User>()
            .HasMany(e => e.Reviews)
            .WithOne(e => e.User)
            .HasForeignKey(e => e.UserId)
            .HasPrincipalKey(e => e.Id);

        modelBuilder
            .Entity<Cart>()
            .HasMany(c => c.CartItems)
            .WithOne(c => c.Cart)
            .HasForeignKey(c => c.CartId)
            .HasPrincipalKey(c => c.Id);

        // modelBuilder
        //     .Entity<Review>()
        //     .HasOne(r => r.Product)
        //     .WithMany(u => u.Reviews)
        //     .HasForeignKey(r => r.ProductId)
        //     .OnDelete(DeleteBehavior.NoAction);
    }
}
