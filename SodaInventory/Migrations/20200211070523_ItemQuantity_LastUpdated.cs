using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SodaInventory.Migrations
{
    public partial class ItemQuantity_LastUpdated : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ItemQuantities_Items_ItemId",
                table: "ItemQuantities");

            migrationBuilder.DropForeignKey(
                name: "FK_ItemQuantities_Stores_StoreId",
                table: "ItemQuantities");

            migrationBuilder.DropForeignKey(
                name: "FK_Items_Companies_CompanyId",
                table: "Items");

            migrationBuilder.DropForeignKey(
                name: "FK_Stores_Companies_CompanyId",
                table: "Stores");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_Companies_CompanyId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_ItemQuantities_StoreId",
                table: "ItemQuantities");

            migrationBuilder.AlterColumn<int>(
                name: "StoreId",
                table: "ItemQuantities",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "ItemId",
                table: "ItemQuantities",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<DateTime>(
                name: "LastUpdated",
                table: "ItemQuantities",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ItemQuantities_Items_ItemId",
                table: "ItemQuantities",
                column: "ItemId",
                principalTable: "Items",
                principalColumn: "ItemId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Items_Companies_CompanyId",
                table: "Items",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "CompanyId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Stores_Companies_CompanyId",
                table: "Stores",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "CompanyId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Companies_CompanyId",
                table: "Users",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "CompanyId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ItemQuantities_Items_ItemId",
                table: "ItemQuantities");

            migrationBuilder.DropForeignKey(
                name: "FK_Items_Companies_CompanyId",
                table: "Items");

            migrationBuilder.DropForeignKey(
                name: "FK_Stores_Companies_CompanyId",
                table: "Stores");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_Companies_CompanyId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "LastUpdated",
                table: "ItemQuantities");

            migrationBuilder.AlterColumn<int>(
                name: "StoreId",
                table: "ItemQuantities",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ItemId",
                table: "ItemQuantities",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ItemQuantities_StoreId",
                table: "ItemQuantities",
                column: "StoreId");

            migrationBuilder.AddForeignKey(
                name: "FK_ItemQuantities_Items_ItemId",
                table: "ItemQuantities",
                column: "ItemId",
                principalTable: "Items",
                principalColumn: "ItemId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ItemQuantities_Stores_StoreId",
                table: "ItemQuantities",
                column: "StoreId",
                principalTable: "Stores",
                principalColumn: "StoreId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Items_Companies_CompanyId",
                table: "Items",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "CompanyId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Stores_Companies_CompanyId",
                table: "Stores",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "CompanyId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Companies_CompanyId",
                table: "Users",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "CompanyId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
