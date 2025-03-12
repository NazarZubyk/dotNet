using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MvcMovie.Migrations
{
    /// <inheritdoc />
    public partial class AddMovieGuid : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "MovieGuid",
                table: "Movie",
                type: "uniqueidentifier",
                nullable: false,
                defaultValueSql: "NEWID()"
            );

            migrationBuilder.Sql("UPDATE Movie SET MovieGuid = NEWID()");
            
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MovieGuid",
                table: "Movie");
        }
    }
}
