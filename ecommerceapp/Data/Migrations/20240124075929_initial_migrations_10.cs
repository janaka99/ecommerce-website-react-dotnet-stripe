using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ecommerceapp.Data.Migrations
{
    /// <inheritdoc />
    public partial class initial_migrations_10 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "27586e61-5c9f-40c7-beb5-4c24a3b97787");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4aa1229a-c1c4-4053-be4d-6200cda2482e");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d0b0c792-9044-43a0-ba6b-b344742158d7");

            migrationBuilder.AlterColumn<int>(
                name: "status",
                table: "Orders",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "24e1b1e3-dde0-412d-9cc5-93acea3007d7", null, "Admin", "ADMIN" },
                    { "50e045af-e238-4265-a01d-7098e89d07bb", null, "User", "USER" },
                    { "5c0002d8-eb4a-4f38-bf9c-9043baec74e8", null, "Employee", "EMPLOYEE" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "24e1b1e3-dde0-412d-9cc5-93acea3007d7");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "50e045af-e238-4265-a01d-7098e89d07bb");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5c0002d8-eb4a-4f38-bf9c-9043baec74e8");

            migrationBuilder.AlterColumn<int>(
                name: "status",
                table: "Orders",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldDefaultValue: 0);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "27586e61-5c9f-40c7-beb5-4c24a3b97787", null, "User", "USER" },
                    { "4aa1229a-c1c4-4053-be4d-6200cda2482e", null, "Admin", "ADMIN" },
                    { "d0b0c792-9044-43a0-ba6b-b344742158d7", null, "Employee", "EMPLOYEE" }
                });
        }
    }
}
