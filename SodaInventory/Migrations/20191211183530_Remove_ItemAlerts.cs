using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SodaInventory.Migrations
{
    public partial class Remove_ItemAlerts : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ItemQuantities_Items_ItemId",
                table: "ItemQuantities");

            migrationBuilder.DropForeignKey(
                name: "FK_ItemQuantities_Stores_StoreId",
                table: "ItemQuantities");

            migrationBuilder.DropTable(
                name: "ItemAlerts");

            migrationBuilder.AlterColumn<int>(
                name: "StoreId",
                table: "ItemQuantities",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ItemId",
                table: "ItemQuantities",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "ModerateLevel",
                table: "ItemQuantities",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "UrgentLevel",
                table: "ItemQuantities",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.CreateTable(
                name: "Audits",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TableName = table.Column<string>(nullable: true),
                    DateTime = table.Column<DateTime>(nullable: false),
                    KeyValues = table.Column<string>(nullable: true),
                    OldValues = table.Column<string>(nullable: true),
                    NewValues = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Audits", x => x.Id);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_ItemQuantities_Items_ItemId",
                table: "ItemQuantities",
                column: "ItemId",
                principalTable: "Items",
                principalColumn: "ItemId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ItemQuantities_Stores_StoreId",
                table: "ItemQuantities",
                column: "StoreId",
                principalTable: "Stores",
                principalColumn: "StoreId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ItemQuantities_Items_ItemId",
                table: "ItemQuantities");

            migrationBuilder.DropForeignKey(
                name: "FK_ItemQuantities_Stores_StoreId",
                table: "ItemQuantities");

            migrationBuilder.DropTable(
                name: "Audits");

            migrationBuilder.DropColumn(
                name: "ModerateLevel",
                table: "ItemQuantities");

            migrationBuilder.DropColumn(
                name: "UrgentLevel",
                table: "ItemQuantities");

            migrationBuilder.AlterColumn<int>(
                name: "StoreId",
                table: "ItemQuantities",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "ItemId",
                table: "ItemQuantities",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.CreateTable(
                name: "ItemAlerts",
                columns: table => new
                {
                    ItemAlertId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ItemId = table.Column<int>(type: "int", nullable: true),
                    ModerateLevel = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    StoreId = table.Column<int>(type: "int", nullable: true),
                    UrgentLevel = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ItemAlerts", x => x.ItemAlertId);
                    table.ForeignKey(
                        name: "FK_ItemAlerts_Items_ItemId",
                        column: x => x.ItemId,
                        principalTable: "Items",
                        principalColumn: "ItemId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ItemAlerts_Stores_StoreId",
                        column: x => x.StoreId,
                        principalTable: "Stores",
                        principalColumn: "StoreId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ItemAlerts_ItemId",
                table: "ItemAlerts",
                column: "ItemId");

            migrationBuilder.CreateIndex(
                name: "IX_ItemAlerts_StoreId",
                table: "ItemAlerts",
                column: "StoreId");

            migrationBuilder.AddForeignKey(
                name: "FK_ItemQuantities_Items_ItemId",
                table: "ItemQuantities",
                column: "ItemId",
                principalTable: "Items",
                principalColumn: "ItemId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ItemQuantities_Stores_StoreId",
                table: "ItemQuantities",
                column: "StoreId",
                principalTable: "Stores",
                principalColumn: "StoreId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
