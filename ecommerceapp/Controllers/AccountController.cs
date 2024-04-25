using System.Security.Claims;
using ecommerceapp.Interfaces.Service;
using ecommerceapp.Mappers;
using ecommerceapp.Models.Domain;
using ecommerceapp.Models.DTOs.Account;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace ecommerceapp.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly ITokenService _tokenService;
        private readonly ICloudinaryService _cldService;

        public AccountController(
            UserManager<User> userManager,
            ITokenService tokenService,
            ICloudinaryService cld
        )
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _cldService = cld;
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDTO registerDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var userExist = await _userManager.FindByEmailAsync(registerDto.Email);

                if (userExist != null)
                {
                    return BadRequest("User already exists from that email");
                }

                var newUser = new User
                {
                    UserName = registerDto.UserName,
                    Email = registerDto.Email,
                };

                var createdUser = await _userManager.CreateAsync(newUser, registerDto.Password);

                if (createdUser.Succeeded)
                {
                    var roleResults = await _userManager.AddToRoleAsync(newUser, "User");
                    if (roleResults.Succeeded)
                    {
                        var userRoles = _userManager.GetRolesAsync(newUser).Result;

                        var userLogins = new UserLogins
                        {
                            LoggedUser = new NewUserDto
                            {
                                UserName = newUser.UserName,
                                Email = newUser.Email,
                                Role = userRoles[0]
                            },
                        };
                        var token = _tokenService.CreateToken(newUser, userRoles);
                        if (token == null)
                        {
                            return StatusCode(500, "Invalid token");
                        }
                        ;
                        userLogins.Token = token;

                        return Ok(userRoles);
                    }
                    else
                    {
                        return BadRequest("Something went wrong try again");
                    }
                }
                else
                {
                    return BadRequest("Something went wrong try again");
                }
            }
            catch (Exception)
            {
                return BadRequest("Something went wrong try again");
            }
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO loginModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Check the form and try again!");
            }

            try
            {
                var user = await _userManager.FindByEmailAsync(loginModel.Email);
                if (user == null)
                {
                    return BadRequest("Can't find user with the email");
                }

                var isAuthenticated = await _userManager.CheckPasswordAsync(
                    user,
                    loginModel.Password
                );
                if (isAuthenticated == false)
                {
                    return BadRequest(
                        "Invalid credentials. Please check your username and password."
                    );
                }

                // Include user roles as claims
                var userRoles = _userManager.GetRolesAsync(user).Result;

                var token = _tokenService.CreateToken(user, userRoles);

                return Ok(
                    new UserLogins
                    {
                        LoggedUser = new NewUserDto
                        {
                            UserName = user.UserName!,
                            Email = user.Email!,
                            Role = userRoles[0],
                            Avatar = user.Avatar,
                        },
                        Token = token,
                    }
                );
            }
            catch (Exception)
            {
                return BadRequest("Something went wrong try again");
            }
        }

        [HttpPut]
        [Route("update-user-info")]
        [Authorize]
        public async Task<IActionResult> UpdateUserInfo(
            [FromForm] string updateDetails,
            IFormFile? file
        )
        {
            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (userId == null)
                {
                    return BadRequest("Something went wrong try again");
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest("Check the form and try again");
                }

                // / Deserialize the JSON string to UserUpdateDTO
                var updateDetailsDto = JsonConvert.DeserializeObject<UserUpdateDTO>(updateDetails);
                var user = await _userManager.FindByIdAsync(userId);

                if (user == null)
                {
                    return BadRequest();
                }
                if (file != null)
                {
                    Console.WriteLine("Reached");
                    var rs = await _cldService.AddPhotoAsync(file);
                    if (rs == null)
                    {
                        return BadRequest("Something went wrong try again");
                    }
                    if (rs.Error == null)
                    {
                        user.Avatar = rs.SecureUrl.ToString();
                        user.Slug = rs.PublicId.ToString();
                    }
                }
                Console.WriteLine("Reached");
                System.Console.WriteLine(updateDetailsDto.PhoneNumber?.ToString());

                user.PhoneNumber = updateDetailsDto.PhoneNumber?.ToString();
                user.Bio = updateDetailsDto.Bio?.ToString();

                await _userManager.UpdateAsync(user);
                return BadRequest("Something went wrong try again");
                // return Ok(user.ToUserDto());
            }
            catch (Exception ex)
            {
                System.Console.WriteLine(ex);
                return BadRequest("Something went wrong try again");
            }
        }

        [HttpPut]
        [Route("update-password")]
        [Authorize]
        public async Task<IActionResult> UpdatePassword([FromBody] UpdatePasswordDTO updateDetails)
        {
            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (userId == null)
                {
                    return BadRequest("Something went wrong try again");
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest("Check the the form and try again");
                }

                var user = await _userManager.FindByIdAsync(userId);
                if (user == null)
                {
                    return BadRequest();
                }

                var isAuthenticated = await _userManager.CheckPasswordAsync(
                    user,
                    updateDetails.CurrentPassword
                );

                if (isAuthenticated == false)
                {
                    return BadRequest("Password is incorrect");
                }

                // Change the user's password
                var token = await _userManager.GeneratePasswordResetTokenAsync(user);
                var result = await _userManager.ResetPasswordAsync(
                    user,
                    token,
                    updateDetails.NewPassword
                );

                if (result.Succeeded)
                {
                    // Include user roles as claims
                    var userRoles = _userManager.GetRolesAsync(user).Result;

                    var jwtToken = _tokenService.CreateToken(user, userRoles);

                    return Ok(
                        new UserLogins
                        {
                            LoggedUser = new NewUserDto
                            {
                                UserName = user.UserName!,
                                Email = user.Email!,
                                Role = userRoles[0],
                                Avatar = user.Avatar
                            },
                            Token = jwtToken
                        }
                    );
                }
                else
                {
                    return BadRequest("Something went wrong try again");
                }
            }
            catch (Exception ex)
            {
                return BadRequest("Something went wrong try again");
            }
        }

        [HttpPut]
        [Route("update-username")]
        [Authorize]
        public async Task<IActionResult> UpdateUsername([FromBody] UpdateUsernameDTO updateDetails)
        {
            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (userId == null)
                {
                    return BadRequest("Something went wrong try again");
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var user = await _userManager.FindByIdAsync(userId);
                if (user == null)
                {
                    return BadRequest("Check the the form and try again");
                }

                // Update the user name
                var result = await _userManager.SetUserNameAsync(user, updateDetails.UserName);

                if (result.Succeeded)
                {
                    // Include user roles as claims
                    var userRoles = _userManager.GetRolesAsync(user).Result;

                    var jwtToken = _tokenService.CreateToken(user, userRoles);

                    return Ok(
                        new UserLogins
                        {
                            LoggedUser = new NewUserDto
                            {
                                UserName = user.UserName!,
                                Email = user.Email!,
                                Role = userRoles[0],
                                Avatar = user.Avatar
                            },
                            Token = jwtToken
                        }
                    );
                }
                else
                {
                    return BadRequest("Something went wrong try again");
                }
            }
            catch (Exception ex)
            {
                return BadRequest("Something went wrong try again");
            }
        }

        [HttpPut]
        [Route("update-email")]
        [Authorize]
        public async Task<IActionResult> UpdateEmail([FromBody] UpdateEmailDTO updateDetails)
        {
            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (userId == null)
                {
                    return BadRequest("Something went wrong try again");
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest("Check the the form and try again");
                }

                var user = await _userManager.FindByIdAsync(userId);
                if (user == null)
                {
                    return BadRequest("Something went wrong try again");
                }

                // Update the user name
                var result = await _userManager.SetEmailAsync(user, updateDetails.Email);

                if (result.Succeeded)
                {
                    // Include user roles as claims
                    var userRoles = _userManager.GetRolesAsync(user).Result;

                    var jwtToken = _tokenService.CreateToken(user, userRoles);

                    return Ok(
                        new UserLogins
                        {
                            LoggedUser = new NewUserDto
                            {
                                UserName = user.UserName!,
                                Email = user.Email!,
                                Role = userRoles[0],
                                Avatar = user.Avatar
                            },
                            Token = jwtToken
                        }
                    );
                }
                else
                {
                    return BadRequest("Something went wrong try again");
                }
            }
            catch (Exception)
            {
                return BadRequest("Something went wrong try again");
            }
        }

        [HttpGet]
        [Route("profile-info")]
        [Authorize]
        public async Task<IActionResult> GetUserProfileData()
        {
            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (userId == null)
                {
                    return BadRequest("Something went wrong try again");
                }

                var user = await _userManager.FindByIdAsync(userId);
                if (user == null)
                {
                    return BadRequest("Something went wrong try again");
                }

                return Ok(user.ToUserDto());
            }
            catch (Exception)
            {
                return BadRequest("Something went wrong try again");
            }
        }

        [HttpGet]
        [Route("all")]
        [Authorize] // Add this attribute to ensure only authenticated users can access this endpoint
        public async Task<IActionResult> GetAllUsers()
        {
            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                var role = User.FindFirstValue(ClaimTypes.Role);
                if (userId == null || role != "Admin")
                {
                    return BadRequest("Something went wrong try again");
                }

                var usersWithRoles = new List<object>();

                foreach (var user in await _userManager.Users.ToListAsync())
                {
                    var roles = await _userManager.GetRolesAsync(user);

                    var userWithRoles = new
                    {
                        user.Id,
                        user.UserName,
                        user.Email,
                        user.Avatar,
                        user.Created_at,
                        Roles = roles // Include roles associated with the user
                    };

                    usersWithRoles.Add(userWithRoles);
                }

                return Ok(usersWithRoles);
            }
            catch (Exception)
            {
                return BadRequest("Something went wrong try again");
            }
        }

        [HttpGet]
        [Route("user-details")]
        [Authorize] // Add this attribute to ensure only authenticated users can access this endpoint
        public async Task<IActionResult> GetUserDetails()
        {
            try
            {
                // Retrieve the user details from the claims
                var userEmail = User.FindFirst(ClaimTypes.Email)?.Value;
                var userName = User.FindFirst(ClaimTypes.GivenName)?.Value;
                var userRoles = User.FindAll(ClaimTypes.Role)?.Select(c => c.Value).ToArray();
                if (userEmail == null)
                {
                    return BadRequest("Something went wrong try again");
                }
                var user = await _userManager.FindByEmailAsync(userEmail);
                if (user == null)
                {
                    return BadRequest("Something went wrong try again");
                }

                var res = new
                {
                    LoggedUser = new NewUserDto
                    {
                        UserName = userName!,
                        Email = userEmail!,
                        Role = userRoles![0],
                        Avatar = user.Avatar
                    }
                };

                return Ok(res);
            }
            catch (Exception)
            {
                return BadRequest("Something went wrong try again");
            }
        }
    }
}
