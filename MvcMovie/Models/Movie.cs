using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer.Query.Internal;

namespace MvcMovie.Models;

public class Movie
{       
    [Key]
    public int Id { get; set; }

    [Required]
    public Guid MovieGuid { get; set; } 

    [DataType(DataType.Text)]
    public string? Title { get; set; }

    [Required]
    [DataType(DataType.Date)]
    public DateTime ReleaseDate { get; set; }

    [DataType(DataType.Text)]
    public string? Genre { get; set; }

    [Required]
    [DataType(DataType.Currency)]
    public decimal Price { get; set; }
}