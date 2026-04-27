using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MuhtarOtomasyon.API.Migrations
{
    /// <inheritdoc />
    public partial class mig2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Istatistikler",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ToplamNufus = table.Column<int>(type: "int", nullable: false),
                    KonutSayisi = table.Column<int>(type: "int", nullable: false),
                    NufusYogunlugu = table.Column<double>(type: "float", nullable: false),
                    OrtalamaHaneGeliri = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    SonGuncelleme = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Istatistikler", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Istatistikler");
        }
    }
}
