using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ecommerceapp.Models.Domain;
using ecommerceapp.Models.DTOs;

namespace ecommerceapp.Mappers
{
    public static class UserMappers
    {
        public static UserDTO ToUserDto(this User user)
        {
            return new UserDTO
            {
                Email = user.Email!,
                PhoneNumber = user.PhoneNumber,
                UserName = user.UserName!,
                Avatar = user.Avatar,
                Created_at = user.Created_at,
                Updated_at = user.Updated_at,
                Bio = user.Bio,
                Id = user.Id
            };
        }

        // public static User ToCreateUserDto(this CreateUserDto newUser)
        // {
        //     return new User
        //     {
        //         Email = newUser.Email,
        //         // Phone = newUser.Phone,
        //         // Role = newUser.Role,
        //         // Name = newUser.Name,
        //     };
        // }
    }
}
