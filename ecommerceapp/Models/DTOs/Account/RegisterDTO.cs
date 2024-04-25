using System.ComponentModel.DataAnnotations;

namespace ecommerceapp.Models.DTOs.Account;

public class RegisterDTO
{
    [Required]
    public required string UserName { get; set; }

    [Required]
    [EmailAddress]
    public required string Email { get; set; }

    [Required]
    [MinLength(8, ErrorMessage = "Password must be at least 8 characters long")]
    public required string Password { get; set; }
}
