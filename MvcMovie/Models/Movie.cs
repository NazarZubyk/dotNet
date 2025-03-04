using System.ComponentModel.DataAnnotations;

namespace MvcMovie.Models;

public class Movie
{       
    
    public int Id { get; set; }

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