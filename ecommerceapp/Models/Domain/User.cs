using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace ecommerceapp.Models.Domain;

public class User : IdentityUser
{
    public string? Slug { get; set; }

    [StringLength(250)]
    public string? Avatar { get; set; }
    public DateTime Created_at { get; set; }
    public DateTime Updated_at { get; set; }

    [StringLength(300)]
    public string? Bio { get; set; }

    public ICollection<Cart>? Carts { get; set; }
    public ICollection<Order>? Orders { get; set; }
    public ICollection<Review>? Reviews { get; set; }
}
