using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ecommerceapp.Data.Migrations
{
    /// <inheritdoc />
    public partial class initial_migrations_6 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AddColumn<int>(
                name: "status",
                table: "Orders",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "800c5e7c-59f8-42fb-9dbd-2056acebb4be", null, "Employee", "EMPLOYEE" },
                    { "a70ceed9-c91c-4d47-8b8a-a3be3f9cb33a", null, "User", "USER" },
                    { "f50b4000-f72d-4094-8e1d-74d3efb39386", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "800c5e7c-59f8-42fb-9dbd-2056acebb4be");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a70ceed9-c91c-4d47-8b8a-a3be3f9cb33a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f50b4000-f72d-4094-8e1d-74d3efb39386");

            migrationBuilder.DropColumn(
                name: "status",
                table: "Orders");

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
    }
}
