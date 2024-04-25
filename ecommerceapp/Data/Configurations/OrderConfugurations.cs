using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ecommerceapp.Models.Domain;
using ecommerceapp.Models.Domain.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ecommerceapp.Data.Configurations;

public class OrderConfugurations : IEntityTypeConfiguration<Order>
{
    public void Configure(EntityTypeBuilder<Order> builder)
    {
        builder
            .Property(e => e.Created_at)
            .HasDefaultValueSql("getutcdate()")
            .ValueGeneratedOnAdd();
        builder.Property(e => e.status).HasDefaultValue(OrderStatus.Pending);
    }
}
