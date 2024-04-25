using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace ecommerceapp.Models.Domain;

public class UserDTO
{
    public required string UserName { get; set; }
    public required string Id { get; set; }
    public string? Avatar { get; set; }
    public required string Email { get; set; }
    public string? PhoneNumber { get; set; }
    public DateTime Created_at { get; set; }
    public DateTime Updated_at { get; set; }

    [StringLength(300)]
    public string? Bio { get; set; }
}
