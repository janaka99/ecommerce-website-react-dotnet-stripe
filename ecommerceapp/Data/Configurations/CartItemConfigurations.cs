using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ecommerceapp.Models.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ecommerceapp.Data.Configurations;

public class CartItemConfigurations : IEntityTypeConfiguration<CartItem>
{
    public void Configure(EntityTypeBuilder<CartItem> builder)
    {
        builder
            .Property(e => e.Created_at)
            .HasDefaultValueSql("getutcdate()")
            .ValueGeneratedOnAdd();
    }
}
