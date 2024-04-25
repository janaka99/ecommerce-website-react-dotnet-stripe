using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ecommerceapp.Data.Migrations
{
    /// <inheritdoc />
    public partial class InitialMigrations_2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0edfb85f-df07-47b9-ba45-7c6e54590ab9");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6ea54035-3ae8-41ad-be37-ab5558f5dc88");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f60d6b37-38b9-45d0-89bd-5db3fff44df9");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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
                    { "0edfb85f-df07-47b9-ba45-7c6e54590ab9", null, "Employee", "EMPLOYEE" },
                    { "6ea54035-3ae8-41ad-be37-ab5558f5dc88", null, "Admin", "ADMIN" },
                    { "f60d6b37-38b9-45d0-89bd-5db3fff44df9", null, "User", "USER" }
                });
        }
    }
}
