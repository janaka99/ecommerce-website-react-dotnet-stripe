using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ecommerceapp.Data.Migrations
{
    /// <inheritdoc />
    public partial class InitialMigrations_3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0f87323e-6766-4510-9059-ed367012f587");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ca6566f2-1935-47aa-8a54-699b8fa80176");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f176edcb-03ff-40a6-959d-a6d8ca35ebb2");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "0f87323e-6766-4510-9059-ed367012f587", null, "Employee", "EMPLOYEE" },
                    { "ca6566f2-1935-47aa-8a54-699b8fa80176", null, "Admin", "ADMIN" },
                    { "f176edcb-03ff-40a6-959d-a6d8ca35ebb2", null, "User", "USER" }
                });
        }
    }
}
