using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ecommerceapp.Data.Migrations
{
    /// <inheritdoc />
    public partial class InitialMigrations_4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "440b68c2-9809-4f21-ab43-8ee098e9dfdc");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4477a9b5-3b7a-4379-90de-ddc4bffab577");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "70d47bf1-d6bb-4a8e-a703-507e92cc1a44");

            migrationBuilder.AddColumn<string>(
                name: "PicturePublicId",
                table: "Products",
                type: "nvarchar(250)",
                maxLength: 250,
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "08125ad9-c560-4fca-bbee-0b9dc2e9011a", null, "User", "USER" },
                    { "71340404-159d-49c9-8e52-ef4150e66720", null, "Employee", "EMPLOYEE" },
                    { "e136591f-047a-454b-90e4-5090968b7cc3", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "08125ad9-c560-4fca-bbee-0b9dc2e9011a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "71340404-159d-49c9-8e52-ef4150e66720");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e136591f-047a-454b-90e4-5090968b7cc3");

            migrationBuilder.DropColumn(
                name: "PicturePublicId",
                table: "Products");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "440b68c2-9809-4f21-ab43-8ee098e9dfdc", null, "Admin", "ADMIN" },
                    { "4477a9b5-3b7a-4379-90de-ddc4bffab577", null, "User", "USER" },
                    { "70d47bf1-d6bb-4a8e-a703-507e92cc1a44", null, "Employee", "EMPLOYEE" }
                });
        }
    }
}
