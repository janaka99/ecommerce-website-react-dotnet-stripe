using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ecommerceapp.Models.DTOs.CategoryDTO
{
    public class UpdateCategoryDTO
    {
        public required int Id { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }
    }
}
