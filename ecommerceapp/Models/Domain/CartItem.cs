using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace ecommerceapp.Models.Domain
{
    public class CartItem
    {
        public int Id { get; set; }
        public DateTime Created_at { get; set; }

        public required int ProductId { get; set; }
        public required int CartId { get; set; }

        public Product? Product { get; set; }

        [JsonIgnore]
        public Cart? Cart { get; set; }
    }
}
