using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ecommerceapp.Models.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ecommerceapp.Data.Configurations;

public class CartConfigurations : IEntityTypeConfiguration<Cart>
{
    public void Configure(EntityTypeBuilder<Cart> builder)
    {
        builder
            .Property(e => e.Created_at)
            .HasDefaultValueSql("getutcdate()")
            .ValueGeneratedOnAdd();
        builder
            .Property(e => e.Updated_at)
            .HasDefaultValueSql("getutcdate()")
            .ValueGeneratedOnUpdate()
            .IsConcurrencyToken();
    }
}
