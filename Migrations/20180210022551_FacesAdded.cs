using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace AzureToolkit.Migrations
{
    public partial class FacesAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SavedImageFace",
                columns: table => new
                {
                    SavedImageFaceId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Age = table.Column<int>(nullable: false),
                    Gender = table.Column<string>(nullable: true),
                    SavedImageId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SavedImageFace", x => x.SavedImageFaceId);
                    table.ForeignKey(
                        name: "FK_SavedImageFace_SavedImages_SavedImageId",
                        column: x => x.SavedImageId,
                        principalTable: "SavedImages",
                        principalColumn: "SavedImageId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SavedImageFace_SavedImageId",
                table: "SavedImageFace",
                column: "SavedImageId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SavedImageFace");
        }
    }
}
