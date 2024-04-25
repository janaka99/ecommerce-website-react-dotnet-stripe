using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ecommerceapp.Data.Migrations
{
    /// <inheritdoc />
    public partial class initial_migrations_12 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4f13ecae-cd31-4430-90aa-e97c969d946b");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a54167d9-755c-4783-b747-4c23daca4b7f");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e16d85f3-2e5f-4ab0-ba34-076c5c5ab92a");

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Products",
                type: "nvarchar(700)",
                maxLength: 700,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(300)",
                oldMaxLength: 300);

            migrationBuilder.AddColumn<int>(
                name: "Sold",
                table: "Products",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "08e2cbb0-095a-4022-a743-7919b58398c8", null, "Employee", "EMPLOYEE" },
                    { "15077810-368b-4a5d-85de-7bebeec55393", null, "Admin", "ADMIN" },
                    { "3224a16f-1cb8-49cb-a397-d1c6b5488465", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "08e2cbb0-095a-4022-a743-7919b58398c8");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "15077810-368b-4a5d-85de-7bebeec55393");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3224a16f-1cb8-49cb-a397-d1c6b5488465");

            migrationBuilder.DropColumn(
                name: "Sold",
                table: "Products");

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Products",
                type: "nvarchar(300)",
                maxLength: 300,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(700)",
                oldMaxLength: 700);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "4f13ecae-cd31-4430-90aa-e97c969d946b", null, "Admin", "ADMIN" },
                    { "a54167d9-755c-4783-b747-4c23daca4b7f", null, "Employee", "EMPLOYEE" },
                    { "e16d85f3-2e5f-4ab0-ba34-076c5c5ab92a", null, "User", "USER" }
                });
        }
    }
}
